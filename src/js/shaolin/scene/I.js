/* scene I */

'use strict';
var game = game || {};

game.scene.I = {

	// either map or fighting
	mode: 'map',
	// bkgd images
	map_bkgd: undefined,
	fight_bkgd: undefined,

	hero: undefined,
	unit: 25,
	// smallestUnit: 25
	exit_location: {
		x: 0,
		y: 0
	},



	// bidness
	// ----------------------------
	setup: function(_hero) {
		// set bkgd images
		var fightImageBkgd = new Image();
		fightImageBkgd.src = game.IMAGES['dusk'];
		this.fight_bkgd = fightImageBkgd;

		// chamber map
		// var fightImageBkgd = new Image();
		// fightImageBkgd.src = game.IMAGES['dusk'];
		// fight_bkgd = fightImageBkgd;


		// set hero into scene
		this.hero = _hero;
		// place on leftside of screen
		this.hero.moveTo(this.unit, game.height/2);



		// set Chamber exit
		this.exit_location.x = game.width - this.unit,
		this.exit_location.y = Math.floor(game.height / 2)






		// make 1 enemy
		var enemy = game.enemy;
		enemy.init(game.ctx, game.width, game.height, 1);
		game.enemies.push(enemy);

	},


	drawExit: function() {
		var size = 35;
		game.canvas.rect(game.ctx, this.exit_location.x - size/2, this.exit_location.y - size/2, size, size, game.COLORS.green);
		
	},

	play: function() {
		// console.log('lol');
		// bkgd
		this.drawBkgd();

		this.drawExit();

		// draw character
		this.hero.update();
		this.hero.draw();

		// update
		for (var i = 0; i < game.enemies.length; i++) {
			game.enemies[i].update();
		};
		// draw enemy
		for (var i = 0; i < game.enemies.length; i++) {
			game.enemies[i].draw();
		};
	},

	drawBkgd: function() {
		// if (this.mode == 'map') {
		// 	game.canvas.rect(game.ctx, 0, 0, canvas.width, canvas.height, game.COLORS.blue);
		// } else {
			game.ctx.drawImage(this.fight_bkgd, 0, 0, game.width, game.height);
		// }
	}


};