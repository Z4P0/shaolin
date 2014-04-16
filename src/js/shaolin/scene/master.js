/* scene master */

'use strict';
var game = game || {};

game.scene = {

	mode: '',
	chamber: 0,

	// our own refernce to hero
	hero: undefined,
	init: function(_hero) {
		this.hero = _hero;
	},

	// current chamber (level)
	current: '',
	set: function(_numeral) {
		this.current = _numeral;
	},
	get: function() {
		return this.current;
	},





	// level settings
	exit_point: undefined,
	walls: undefined,

	// bkgd images
	map_bkgd: undefined,
	fight_bkgd: undefined,
	current_bkgd: undefined,


	prep: function(_settings) {

		this.chamber = _settings.chamber;

		// set starting point		
		this.map_point = _settings.start_point;

		// get exit
		this.exit_point = _settings.exit;

		// level enemies
		game.enemies = []; // empty enemies from previous chamber
		// make new enemies
		for (var i = 0; i < _settings.enemies.length; i++) {
			var enemy = game.enemy;
			enemy.init(game.ctx, game.width, game.height, 1, _settings.enemies[i].x, _settings.enemies[i].y);
			game.enemies.push(enemy);			
		};

		// walls
		this.walls = _settings.walls;

		// bkgd images
		var mapImageBkgd = new Image();
		mapImageBkgd.src = _settings.map;
		this.map_bkgd = mapImageBkgd;

		var fightImageBkgd = new Image();
		fightImageBkgd.src = _settings.fight;
		this.fight_bkgd = fightImageBkgd;

		// this.current_bkgd = this.map_bkgd;
		this.mapSetup();
	},




	// scene loop
	play: function() {
		// bkgd
		this.drawBkgd();

		if (this.mode == 'map') {

			// draw character
			this.hero.update();

			this.drawWalls();

			// show exit
			this.drawExit();


			// update
			for (var i = 0; i < game.enemies.length; i++) {
				game.enemies[i].update();
			};
			// draw enemy
			for (var i = 0; i < game.enemies.length; i++) {
				game.enemies[i].draw();
			};

			this.HUD_map();

			/* collision test */
			this.checkForCollisions();
		}

		// FIGHT
		if (this.mode == 'fight') {

			game.fight.round();

			if (game.fight.done()) {
				game.enemies = game.enemies.filter(function(enemy) {
					var stats = enemy.getStats();
					return stats.health - stats.damage > 0;
				});

				// reset to map things
				this.mapSetup();

				// reset gamecanvas
			}
		}

		this.hero.draw();

	},






	drawExit: function() {
		game.canvas.rect(game.ctx, 
			this.exit_point.x - this.exit_point.width/2,
			this.exit_point.y - this.exit_point.height/2,
			this.exit_point.width,
			this.exit_point.height,
			game.COLORS.green);
	},



	drawWalls: function() {
		for (var i = 0; i < this.walls.length; i++) {
			game.canvas.rect(game.ctx, this.walls[i].x, this.walls[i].y, this.walls[i].width, this.walls[i].height, game.COLORS.black);
		};
	},



	checkForCollisions: function() {
		var hero_position = this.hero.getPosition();
		var hero_stats = this.hero.getStats();

		// check to see if a guard has found our hero
		for (var i = 0; i < game.enemies.length; i++) {
			if(this.collides(game.enemies[i].getPosition(), hero_position, true)) {
				this.fightSetup(game.enemies[i]);
			}
		};

		// check for wall collisions
		for (var i = 0; i < this.walls.length; i++) {
			if (this.collides(this.walls[i], hero_position, true)) {
				
				if (game.keyPressed[game.KEYBOARD.UP]) {
					this.hero.moveTo(hero_position.x, (hero_position.y + hero_stats.speed));
					// console.log('coming up');
				}
				if (game.keyPressed[game.KEYBOARD.DOWN]) {
					// var newY = hero_position.y - hero_stats.speed;
					// this.hero.moveTo(hero_position.x, newY);
					this.hero.moveTo(hero_position.x, (hero_position.y - hero_stats.speed));
				}
				
				if (game.keyPressed[game.KEYBOARD.LEFT]) {
					this.hero.moveTo((hero_position.x + hero_stats.speed), hero_position.y);
					// console.log('bumped into right side');
				}
				if (game.keyPressed[game.KEYBOARD.RIGHT]) {
					this.hero.moveTo((hero_position.x - hero_stats.speed), hero_position.y);
					// console.log('bump in from left');
				}

				// console.log('collision with WALL: ' + (i + 1));
			}
		};

		// check if we've reached the exit
		if (this.collides(hero_position, this.exit_point, true)) {
			var test = this.chamber + 1;
			game._.scene(test);
		}
	},

	collides: function (a, b, upperLeftAnchor) {
		// pass in true for upperLeftAnchor if you are drawing 
		// sprites from the upper left corner
		if(!upperLeftAnchor){
			// clone objects
			var a = Object.create(a);
			var b = Object.create(b);

			// move x,y
			a.x -= a.width/2;
			a.y -= a.height/2;
			b.x -= b.width/2;
			b.y -= b.height/2;
		}


		return a.x < b.x + b.width &&
		a.x + a.width > b.x &&
		a.y < b.y + b.height &&
		a.y + a.height > b.y;
		// // assume a and b have x and y properties
		// return a.x < b.x + b.width &&
		// 			a.x + a.width > b.x &&
		// 			a.y < b.y + b.height &&
		// 			a.y + a.height > b.y;
	},


	mapSetup: function() {
		this.mode = 'map';

		this.changeBkgd(0);

		// move hero to last position on map
		this.hero.moveTo(this.map_point.x, this.map_point.y);
		this.hero.mapSetup();

		// reset current enemy
		this.current_enemy = undefined;

		// setup enemies
		for (var i = 0; i < game.enemies.length; i++) {
			game.enemies[i].mapSetup();
		};
	},



	map_point: {},
	current_enemy: undefined,

	fightSetup: function(enemy) {

		this.mode = 'fight';

		this.changeBkgd(1);

		// save map position
		var pos = this.hero.getPosition();
		this.map_point.x = pos.x;
		this.map_point.y = pos.y;

		// for convenience
		var quarter = game.unit * 8; // split width into units of 4 
		var fightY = game.height - (game.unit * 6);

		// move hero to left
		this.hero.moveTo(quarter, fightY);
		this.hero.fightSetup();

		// draw enemy
		this.current_enemy = enemy;
		// move hero to the right
		pos = this.current_enemy.getPosition();
		this.current_enemy.moveTo(game.width - quarter - pos.width, fightY);
		this.current_enemy.fightSetup();

		/* make call to fight.js */
		game.fight.setup(this.hero, this.current_enemy);
	},


	changeBkgd: function(_newBkgd) {
		if (_newBkgd == 0) {
			this.current_bkgd = this.map_bkgd;
		} else if (_newBkgd == 1) {
			this.current_bkgd = this.fight_bkgd;
		}
	},

	drawBkgd: function() {
		game.ctx.drawImage(this.current_bkgd, 0, 0, game.width, game.height);
	},


	HUD_map: function() {
		var fontSize = 16;
		// show in bottom right
		game.canvas.text(game.ctx, 'Chamber: 1', game.unit, game.height - game.unit, fontSize, game.COLORS.white);
	}

};