/* fight module */

'use strict';
var game = game || {};

game.fight = {

	targetKey: undefined,
	keyString: '',
	timer: 0,
	limit: 0,
	counterLimit: 0,
	counterMode: false,
	countdown_width: undefined,
	hero: undefined,
	enemy: undefined,
	dt: 1/60,
	attacked: false,
	fightDone: false,


	setup: function(hero, enemy) {
		// var h_stats = hero.getStats();
		// var e_stats = enemy.getStats();

		this.countdown_width = game.unit * 3;

		this.hero = hero;
		this.enemy = enemy;

		// limit is based on the hero's speed
		// ... but for easing into the game we'll set the inital levels
		// for the first 3 chambers
		if (game.scene.get() == 'I') {
			this.limit = 5;
			this.counterLimit = 3;
		}
		if (game.scene.get() == 'II') {
			this.limit = 3;
			this.counterLimit = 1.5;
		}
		if (game.scene.get() == 'III') {
			this.limit = 1;
			this.counterLimit = 1;
		}

	},


	newRound: function() {
		this.targetKey = undefined;
		this.timer = 0;
		this.counterMode = false;
	},

	enterCounterMode: function() {
		this.counterMode = true;
		this.timer = 0;
	},

	round: function() {
		// make sure we have a target key
		if (!this.targetKey) this.newKey();


		// draw [A] [S] [D]  [SPACE]
		this.HUD();


		// add to timer
		this.timer += this.dt;

		/* this is sensitive to the fact that */
		/* 'limit' is more than 'counterLimit' */
		if (this.counterMode) {
			/*
			if the user presses SPACE, the enemy is countered
			else they take damage
			*/

			if (this.hero.counter()) this.newRound();

			if (this.timer > this.counterLimit) {				
				this.hero.takeDamage(this.enemy.attack());
				this.newRound();
			}			
		} else {
			// check if user is pressing the right key
			if (this.hero.fight(this.targetKey)) {
				// do damage
				if (!this.attacked) {
				// we put it in this if statement to make sure it only happens once
				// doesn't always work.. to fix
					this.enemy.takeDamage(this.hero.attack());
					this.attacked = true;
					this.enterCounterMode();
				}
			}

			if (this.timer > this.limit) this.enterCounterMode();
		}


		// check if they are still alive
		this.checkFighters();

	},

	checkFighters: function() {
		var h_stats = this.hero.getStats();
		var e_stats = this.enemy.getStats();
		if (e_stats.health - e_stats.damage <= 0) {
			console.log('enemy dead');
			this.fightDone = true;
		}
		if (h_stats.health - h_stats.damage <= 0) {
			console.log('game over');
			game._.over();
		}

	},

	done: function() {
		return this.fightDone;
	},

	newKey: function() {

		// choose a random key between A, S, D as the key the user has to press
		var key = Math.floor(Math.random() * 3);
		// console.log(key);
		if (key == 0) {
			this.targetKey = game.FIGHTKEYS.A;
			this.keyString = 'A';
		}
		if (key == 1) {
			this.targetKey = game.FIGHTKEYS.S;
			this.keyString = 'S';
		}
		if (key == 2) {
			this.targetKey = game.FIGHTKEYS.D;
			this.keyString = 'D';
		}
		
		this.attacked = false;
	},

	calculateCountdownWidth: function() {
		var remainingTime = this.limit - this.timer;
		var ratio = Math.floor(remainingTime / this.limit * 100);
		var newWidth = (this.countdown_width * ratio)/100;
		return newWidth;
	},

	slowTime: function() {
		this.dt = 1/30;
	},

	HUD: function() {
		// rect 	| 	ctx, x, y, w, h, col
		// text 	| 	ctx, string, x, y, size, col
		
		var y = game.unit * 4;
		var fz = game.unit - 10;
		var extra = fz / 4;

		/* draw target key */
		game.canvas.rect(game.ctx, 
			Math.floor(game.width/2) - (game.unit * 3)/2, 
			Math.floor(game.height/2) - game.unit * 5,
			game.unit * 3, game.unit * 2.5, 
			game.COLORS.white);

		if (this.counterMode) {
			game.canvas.rect(game.ctx, 
				Math.floor(game.width/2) - (game.unit * 6)/2, 
				Math.floor(game.height/2) - game.unit * 5,
				game.unit * 6, game.unit * 2.5, 
				game.COLORS.white);

			game.canvas.text(game.ctx, 'SPACE', 
				Math.floor(game.width/2) - (game.unit*2.5), 
				Math.floor(game.height/2) - game.unit * 3 - (game.unit/7),
				fz*2, game.COLORS.red);
		} else {
			game.canvas.rect(game.ctx, 
				Math.floor(game.width/2) - (game.unit * 3)/2, 
				Math.floor(game.height/2) - game.unit * 5,
				game.unit * 3, game.unit * 2.5, 
				game.COLORS.white);


			game.canvas.text(game.ctx, this.keyString, 
				Math.floor(game.width/2) - (game.unit * 2)/2, 
				Math.floor(game.height/2) - game.unit * 3 - (game.unit/7),
				fz*3, game.COLORS.red);
		}

		// draw key countdown bar
		// var countdown_width = game.unit * 3;
		var newCountdown_width = this.calculateCountdownWidth();
		game.canvas.rect(game.ctx, 
			Math.floor(game.width/2) - (game.unit * 3)/2, 
			Math.floor(game.height/2) - game.unit * 2,
			newCountdown_width,
			game.unit/2, 
			game.COLORS.blue);



		/*
			user interface
		*/

		// A
		game.canvas.rect(game.ctx, game.unit * 2, y, game.unit, game.unit, game.COLORS.white);
		game.canvas.text(game.ctx, 'A', 
			game.unit * 2 + extra, 
			y + extra * 4, 
			fz, game.COLORS.blue);

		// S
		game.canvas.rect(game.ctx, game.unit * 4, y, game.unit, game.unit, game.COLORS.white);
		game.canvas.text(game.ctx, 'S', 
			game.unit * 4 + extra, 
			y + extra * 4, 
			fz, game.COLORS.blue);

		// D
		game.canvas.rect(game.ctx, game.unit * 6, y, game.unit, game.unit, game.COLORS.white);
		game.canvas.text(game.ctx, 'D', 
			game.unit * 6 + extra, 
			y + extra * 4, 
			fz, game.COLORS.blue);


		// SPACE
		game.canvas.rect(game.ctx, game.unit * 8, y, game.unit * 3, game.unit, game.COLORS.white);
		game.canvas.text(game.ctx, 'SPACE', 
			game.unit * 8 + extra, 
			y + extra * 4, 
			fz, game.COLORS.blue);

	}
};