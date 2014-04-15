/* our game manager */

'use strict';
var game = game || {};

game._ = function() {
	
	// canvas vars
	var canvas, ctx;
	var reference;
	var bkgd;

	// character
	var hero;

	// for convenience
	var width, height;
	var center = {}; // x,y
	var em = 16;




	/* let's do it */
	// ----------------------------
	var init = function() {
		// set up canvas
		canvas = document.querySelector('#canvas');
		ctx = game.ctx = canvas.getContext('2d');
		reference = document.querySelector('.container');

		// set size
		sizeCanvas();

		// meet our hero
		hero = game.hero;
		hero.init(width, height);

		// prep our scene manager
		game.scene.init(hero);

		// start loop
		update();
	}



	var update = function() {
		// clear screen
		game.canvas.clear(ctx, 0, 0, width, height);

		// PAUSED?
		if (game.paused){
			pauseScreen();
			return;
		}

		if (game.scene.get() == 'I') game.scene.I.play();
		if (game.scene.get() == 'II') game.scene.II.play();
		if (game.scene.get() == 'III') game.scene.III.play();

		// da loop
		game.animationID = requestAnimationFrame(update);
	}






	/* scene manager */
	// ----------------------------
	var scene = function(name) {
		if(name == 'I') {
			game.scene.set('I');
			game.scene.I.setup(hero);
		}
		if(name == 'II') {
			game.scene.set('II');
			game.scene.II.setup(hero);
		}
		if(name == 'III') {
			game.scene.set('III');
			game.scene.III.setup(hero);
		}
	}


	// pause screen
	var pauseScreen = function() {
		ctx.save();
		game.canvas.blackOverlay(ctx, width, height);
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		game.canvas.text(ctx, 'Paused', center.x, center.y, 20, 'white');
		ctx.restore();
	}

	var over = function() {
		ctx.save();
		game.canvas.blackOverlay(ctx, width, height);
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		game.canvas.text(ctx, 'Game Over', center.x, center.y, 20, 'white');
		ctx.restore();	
	}

	// resize, set width/height and origin
	var sizeCanvas = function() {
		canvas.width = width = 1024;
		// canvas.width = width = reference.clientWidth;
		canvas.height = height = 512;
		// canvas.height = height = Math.floor(reference.clientWidth / 2);
		center.x = Math.floor(width/2);
		center.y = Math.floor(height/2);
		console.log(width, height);

		game.width = width;
		game.height = height;
		game.unit = width / 32;
		if (game.unit < 10) game.unit = 10;
	}

	var bkgd = function() {
		canvas.className = 'fight';
		canvas.style.backgroundImage = "url('" + game.IMAGES['chamber'] + "')";
		// background = game.IMAGES['chamber'];
	}

	return {
		init: init,
		update: update,
		over: over,
		sizeCanvas: sizeCanvas,
		scene: scene,
		bkgd: bkgd
	}
}();