/* scene I */

'use strict';
var game = game || {};

game.scene.I = {

	// bidness
	// ----------------------------
	setup: function() {

		var chamber = 1;

		// locations
		/* =================
			- hero start point
			- exit point
			- enemy point
		*/

		// set hero into scene		
		var hero_point = {
			x: game.unit,
			y: Math.floor(game.height/2)
		};

		// set Chamber exit
		var exit_point = {
			x: game.width - game.unit * 2,
			y: Math.floor(game.height / 2),
			width: game.unit * 2,
			height: game.unit * 2
		};

		// make 1 enemy
		var enemies = [
			{
				x: game.unit * 4,
				y: game.height / 2
			}
		];

		/* walls */
		var walls = [
			// x, y, w, h
			{x: game.unit * 3, y: game.unit * 2, w: game.unit * 8, h: game.unit},
			{x: game.unit * 3, y: game.height - game.unit * 2, w: game.unit * 8, h: game.unit}
		];


		/* instialize the scene */
		game.scene.prep({
			chamber: chamber,
			start_point: hero_point,
			exit: exit_point,
			enemies: enemies,
			walls: walls,
			map: game.IMAGES['chamber-floor'],
			fight: game.IMAGES['chamber']
		});

	}
};