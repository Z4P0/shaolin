/* our game manager */

'use strict';
var game = game || {};

game._ = function() {
	
	// canvas vars
	var canvas, ctx;
	var reference;

	// character
	var hero;

	// for convenience
	var width, height;
	var center = {}; // x,y
	var em = 16;


	/* let's do it */
	var init = function() {
		// set up canvas
		canvas = document.querySelector('#canvas');
		ctx = game.ctx = canvas.getContext('2d');
		reference = document.querySelector('.container');

		// set size
		resizeCanvas();

		// our hero
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

		if (game.scene == 'I') sceneOne();
		if (game.scene == 'II') sceneTwo();
		if (game.scene == 'III') sceneThree();

		// da loop
		game.animationID = requestAnimationFrame(update);
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




	var resizeCanvas = function() {
		canvas.width = width = reference.clientWidth;
		canvas.height = height = Math.floor(reference.clientWidth / 2);
		center.x = Math.floor(width/2);
		center.y = Math.floor(height/2);
		// drawBkgd();
	}



	/* scene manager */
	var scene = function(name) {
		if(name == 'I') {
			sceneOne_setup();
			sceneOne();
			game.scene = 'I';
		}
		if(name == 'II') {sceneTwo(); game.scene = 'II';}
		if(name == 'III') {sceneThree(); game.scene = 'III';}
	}

	var sceneOne_setup = function() {
		// make 1 enemy
		var enemy = game.enemy;
		enemy.init(game.ctx, width, height);
		game.enemies.push(enemy);

		console.log(game.enemies);
	}

	var sceneOne = function() {
		// bkgd
		drawBkgd();

		// draw character
		hero.update();
		hero.draw();

		// draw enemy
		for (var i = 0; i < game.enemies.length; i++) {
			game.enemies[i].draw();
		};
		// console.log(game.enemies);
	}

	var sceneTwo = function() {
		console.log('hello from: scene II');
	}
	var sceneThree = function() {
		console.log('hello from: scene III');
	}


	/* screen funtions */
	var drawBkgd = function() {
		game.canvas.rect(ctx, 0, 0, canvas.width, canvas.height, game.COLORS.blue);
	}

	return {
		init: init,
		update: update,
		resizeCanvas: resizeCanvas,
		scene: scene
	}
}();