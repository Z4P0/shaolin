'use strict';

var game = game || {};

game.KEYBOARD = {
	'LEFT': 37,
	'RIGHT': 39,
	'UP': 38,
	'DOWN': 40,
	'SPACE': 32,
	'ENTER': 13,
	'SHIFT': 16,
	'A': 65,
	'S': 83,
	'D': 68,
	'P': 80,
	'1': 49,
	'2': 50,
	'3': 51,
	'4': 52,
	'ESC': 27
};

game.IMAGES = {
	// 'background': {
	'dark-night': 'assets/backgrounds/tMVGqP6h.jpg',
	'night': 'assets/backgrounds/nK8JAYqh.jpg',
	'dusk': 'assets/backgrounds/q7Uq7Tsh.jpg',
	'daytime': 'assets/backgrounds/Lsg8aD3h.jpg',
	'evening': 'assets/backgrounds/p00lPs6h.jpg'
	// }
};

game.animationID = undefined;
game.paused = false;

game.keyPressed = [];

// load da things
Modernizr.load({
	load: [
		// js
		'js/shaolin/game.js',
		// images
		// game.IMAGES['dark-night'],
		// game.IMAGES['night'],
		// game.IMAGES['dusk'],
		// game.IMAGES['daytime'],
		// game.IMAGES['evening']
	],

	complete: function() {
		
		// event handlers
		window.onblur = function() {
			game.paused = true;
			cancelAnimationFrame(game.animationID);
			game.keyPressed = [];
			// game._.update();
		}
		window.onfocus = function() {
			game.paused = false;
			cancelAnimationFrame(game.animationID);
			// game._.update();
		}

		// keyup/down
		window.onkeydown = function(e) {
			game.keyPressed[e.keyCode] = true;
		}
		window.onkeyup = function(e) {
			game.keyPressed[e.keyCode] = false;
		}


		// start game
		/* =================================== */
		game._.init();		
	}

});