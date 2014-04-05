/* our game manager */

'use strict';
var game = game || {};

game._ = function() {
	
	// canvas vars
	var canvas, ctx;
	var reference;

	// for convenience
	var width, height;
	var em = 16;
	var draw;


	/* let's do it */
	var init = function() {
		// set up canvas
		canvas = document.querySelector('#canvas');
		ctx = canvas.getContext('2d');
		reference = document.querySelector('.container');
		drawCanvas();
	}

	var drawCanvas = function() {
		canvas.width = width = reference.clientWidth;
		canvas.height = height = Math.floor(reference.clientWidth / 2);
	}



	/* screen funtions */
	var homeScreen = function() {
		// colors
		var yellow = game.COLORS.yellow;
		var black = game.COLORS.black;
		// x/y positions
		var x = width - (20 * em);
		var y = height - (4 * em);

		// draw bkgd
		draw.rect(ctx, 0, 0, canvas.width, canvas.height, black);
	}

	return {
		init: init,
		drawCanvas: drawCanvas
	}
}();