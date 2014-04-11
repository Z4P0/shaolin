/* scene I */

'use strict';
var game = game || {};

game.scene_I = {

	// either exploring or fighting
	mode: 'exploring',
	// bkgd images
	map_bkgd: undefined,
	fight_bkgd: undefined,

	hero: undefined,
	unit: 25,
	// smallestUnit: 25



	// bidness
	// ----------------------------
	setup: function(_hero) {

		// set bkgd images
		var fightImageBkgd = new Image();
		fightImageBkgd.src = game.IMAGES['dusk'];
		this.fight_bkgd = fightImageBkgd;
		// fight bkgd will be a simple map
		// var fightImageBkgd = new Image();
		// fightImageBkgd.src = game.IMAGES['dusk'];
		// fight_bkgd = fightImageBkgd;


		// set hero into scene
		this.hero = _hero;
		// place on leftside of screen
		// walk to the right

		console.log(game);
		// console.log(game._.getHeight);
		// console.log(game._.width);
		// this.hero.x = 0 + game._.width/10;
		// this.hero.y = game._.height/2;

		// set Chamber exit


		// make 1 enemy
		var enemy = game.enemy;
		enemy.init(game.ctx, game._.width, game._.height, 1);
		game.enemies.push(enemy);

		// make an exit square
		this.createExit();
	},

	createExit: function() {
		console.log('the exit will be directly accress from the user in this one');
	},

	play: function() {
		// bkgd
		this.drawBkgd();

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
		if (this.mode == 'exploring') {
			game.canvas.rect(game.ctx, 0, 0, canvas.width, canvas.height, game.COLORS.blue);
		} else {
			game.ctx.drawImage(fight_bkgd, 0, 0, width, height);
		}
	}


};