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

game.COLORS = {
	'yellow': '#f6cb1a',
	'black': '#2f2f2f'
};

game.SOUNDS = {
	bell: {
		id: "bell",
		src: "assets/sounds/bell.mp3"
	},
	jab: {
		id: "jab",
		src: "assets/sounds/jab.mp3"
	},
	kick: {
		id: "kick",
		src: "assets/sounds/kick.mp3"
	},
	punch: {
		id: "punch",
		src: "assets/sounds/punch.mp3"
	},
	sword: {
		id: "sword",
		src: "assets/sounds/sword-swing.mp3"
	},
	thud: {
		id: "thud",
		src: "assets/sounds/thud.mp3"
	}
}

game.ctx = undefined;
game.animationID = undefined;
game.paused = false;
game.scene = ''; // I, II, III
game.enemies = [];

game.keyPressed = [];

// load da things
Modernizr.load({
	load: [
		// js
		'js/shaolin/game.js',
		'js/shaolin/canvas.js',
		'js/shaolin/hero.js',
		'js/shaolin/enemy.js',
		// images
		// game.IMAGES['dark-night'],
		// game.IMAGES['night'],
		// game.IMAGES['dusk'],
		// game.IMAGES['daytime'],
		// game.IMAGES['evening']
	],

	complete: function() {
		
		/* event handlers */

		window.onblur = function() {
			game.paused = true;
			cancelAnimationFrame(game.animationID);
			game.keyPressed = [];
			game._.update();
		}
		window.onfocus = function() {
			game.paused = false;
			cancelAnimationFrame(game.animationID);
			game._.update();
		}
		window.onresize = function() {
			game._.resizeCanvas();
		}

		// keyup/down
		window.onkeydown = function(e) {
			game.keyPressed[e.keyCode] = true;
		}
		window.onkeyup = function(e) {
			game.keyPressed[e.keyCode] = false;
		}



		/* sound stuff */

		// createjs.Sound.alternateExtensions = ["mp3"];
		createjs.Sound.registerSound(game.SOUNDS.bell);
		createjs.Sound.registerSound(game.SOUNDS.jab);
		createjs.Sound.registerSound(game.SOUNDS.kick);
		createjs.Sound.registerSound(game.SOUNDS.punch);
		createjs.Sound.registerSound(game.SOUNDS.sword);
		createjs.Sound.registerSound(game.SOUNDS.thud);

		createjs.Sound.addEventListener("fileload", handleFileLoad);

		function handleFileLoad(e) {
			console.log('pre-loaded sound: ', e.id, e.src);
			// if (e.src == "sounds/soundtrack.ogg") app.blastem.startSoundtrack();
		}
			


		/* do canvas things */
		game._.init();
		

		/* start game */
		document.querySelector('#start span').onclick = function() {
			// play bell
			// createjs.Sound.play("bell");

			// scene I
			game._.scene('I');
			
			// hide start screen
			document.querySelector('#start').style.display = 'none';
		}

	}

});