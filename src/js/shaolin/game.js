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
		resizeCanvas();

		// meet our hero
		hero = game.hero;
		hero.init(width, height);

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

		if (game.scene == 'I') game.scene.I.play();
		if (game.scene == 'II') game.scene.II.play();
		if (game.scene == 'III') game.scene.III.play();

		// da loop
		game.animationID = requestAnimationFrame(update);
	}






	/* scene manager */
	// ----------------------------
	var scene = function(name) {
		if(name == 'I') {
			game.scene = 'I';
			game.scene.I.setup();
		}
		if(name == 'II') {
			game.scene = 'II';
			game.scene.II.setup();
		}
		if(name == 'III') {
			game.scene = 'III';
			game.scene.III.setup();
		}
	}


	// pause screen
	var pauseScreen = function() {
		ctx.save();
		// game.canvas.backgroundGradient(ctx, width, height);
		game.canvas.blackOverlay(ctx, width, height);
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		game.canvas.text(ctx, 'Paused', center.x, center.y, 20, 'white');
		ctx.restore();
	}

	// resize, set width/height and origin
	var resizeCanvas = function() {
		canvas.width = width = reference.clientWidth;
		canvas.height = height = Math.floor(reference.clientWidth / 2);
		center.x = Math.floor(width/2);
		center.y = Math.floor(height/2);
		// drawBkgd();
	}




	return {
		init: init,
		update: update,
		resizeCanvas: resizeCanvas,
		scene: scene
	}
}();