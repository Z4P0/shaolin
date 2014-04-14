/* scene 2 */

'use strict';
var game = game || {};

game.scene.II = {

	// either map or fight
	mode: 'map',
	chamber: 2,
	enemies: 2,

	// bkgd images
	map_bkgd: undefined,
	fight_bkgd: undefined,
	current_bkgd: undefined,

	hero: undefined,
	
	exit_location: {
		x: 0,
		y: 0,
		width: 35,
		height: 35
	},

	unit: 25, // purely for position things, an aesthetic thing



	setup: function(_hero) {
		/*
		- set bkgd images
		- set player start position
		- set chamber exit vector -- must reach to get to next Chamber
		- make enemies to roam the Chambers
		*/

		// set bkgd images
		// var fightImageBkgd = new Image();
		// fightImageBkgd.src = game.IMAGES['dusk'];
		// this.fight_bkgd = fightImageBkgd;

		// chamber map
		// var fightImageBkgd = new Image();
		// fightImageBkgd.src = game.IMAGES['dusk'];
		// map_bkgd = fightImageBkgd;

		// // current bkgd
		// this.current_bkgd = this.fight_bkgd;
		// // this.current_bkgd = this.map_bkgd; // * it should be this one *



		// // set hero into scene
		// this.hero = _hero; // leftside of screen
		// this.hero.moveTo(this.unit, game.height/2);

		// // set Chamber exit
		// this.exit_location.x = game.width - this.unit,
		// this.exit_location.y = Math.floor(game.height / 2)

		// // make 1 enemy
		// // for (var i = 0; i < this.enemies; i++) {
		// 	var enemy = game.enemy;
		// 	enemy.init(game.ctx, game.width, game.height, 1);
		// 	game.enemies.push(enemy);
		// // };
		console.log('II setup');
	},



	play: function() {
		console.log('II play');
		// // bkgd
		// this.drawBkgd();

		// if (this.mode == 'map') {
		// 	this.drawExit();
		// 	/* collision test */
		// 	this.checkForCollisions();

		// 	// draw character
		// 	this.hero.update();
		// 	this.hero.draw();

		// 	// update
		// 	for (var i = 0; i < game.enemies.length; i++) {
		// 		game.enemies[i].update();
		// 	};
		// 	// draw enemy
		// 	for (var i = 0; i < game.enemies.length; i++) {
		// 		game.enemies[i].draw();
		// 	};

		// }
		// if (this.mode == 'fight') {
		// 	console.log('fight fight fight');	
		// }

		// this.HUD();
	}
	// },



	// changeBkgd: function(_newBkgd) {
	// 	if (_newBkgd == 0) {
	// 		this.current_bkgd = this.map_bkgd;
	// 	} else if (_newBkgd == 1) {
	// 		this.current_bkgd = this.fight_bkgd;
	// 	}
	// },

	// drawBkgd: function() {
	// 	game.ctx.drawImage(this.current_bkgd, 0, 0, game.width, game.height);
	// },


	// drawExit: function() {
	// 	game.canvas.rect(game.ctx, 
	// 		this.exit_location.x - this.exit_location.width/2,
	// 		this.exit_location.y - this.exit_location.height/2,
	// 		this.exit_location.width,
	// 		this.exit_location.height,
	// 		game.COLORS.green);
	// },


	// checkForCollisions: function() {
	// 	// check to see if a guard has found our hero
	// 	for (var i = 0; i < game.enemies.length; i++) {
	// 		if(this.collides(game.enemies[i].getPosition(), this.hero.getPosition())) {
	// 			this.mode = 'fight';
	// 			this.changeBkgd('fight');
	// 		}
	// 	};

	// 	// check if we've reached the exit
	// 	if (this.collides(this.hero.getPosition(), this.exit_location)) {
	// 		game._.scene('II');
	// 	}
	// },


	// collides: function(a, b) {
	// 	// assume a and b have x and y properties
	// 	return a.x < b.x + b.width &&
	// 				a.x + a.width > b.x &&
	// 				a.y < b.y + b.height &&
	// 				a.y + a.height > b.y;
	// },


	// HUD: function() {
	// 	var fontSize = 16;
	// 	// show in bottom right
	// 	game.canvas.text(game.ctx, 'Chamber: 2', this.unit, game.height - this.unit, fontSize, game.COLORS.white);
	// }


};