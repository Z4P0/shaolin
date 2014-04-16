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

		// make 3 enemy
		var stats = {
			health: 40,
			strength: 10,
			stamina: 5,
			speed: 7,
			damage: 0			
		}
		var enemies = [
			{
				x: game.unit * 6,
				y: game.height / 2,
				pattern: 1,
				range: game.unit * 4,
				stats: stats
			},
			{
				x: game.unit * 16,
				y: game.height / 2,
				pattern: 1,
				range: game.unit * 2,
				stats: stats
			},
			{
				x: game.unit * 25,
				y: game.height / 2,
				pattern: 1,
				range: game.unit * 3,
				stats: stats
			}
		];

		/* walls */
		var walls = [
			// x, y, w, h
			{x: game.unit * 8, y: game.unit * 4, width: game.unit * 16, height: game.unit},
			{x: game.unit * 8, y: game.height - game.unit * 4 - game.unit, width: game.unit * 16, height: game.unit}
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