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
	// for the credits
	var creditMusic = false;
	var creditTimer = 0;




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

		if (game.scene.mode != '') {
			game.scene.play();			
		}

		// da loop
		game.animationID = requestAnimationFrame(update);
	}






	/* scene manager */
	// ----------------------------
	var scene = function(_chamber) {
		if(_chamber == 1) {
			game.scene.set('I');
			game.scene.I.setup();
		}
		if(_chamber == 2) {
			game.scene.set('II');
			game.scene.II.setup();
		}
		if(_chamber == 3) {
			game.scene.set('III');
			game.scene.III.setup();
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

		if (!creditMusic) {
			createjs.Sound.play("end");
			creditMusic = true;
		}

		var text = 'Game Over';
		if (creditTimer > 3) text = 'Thanks for playing!';
		if (creditTimer > 6) text = 'Story inspired by Wu-Tang\s latest project...';
		if (creditTimer > 8) text = '... releasing a single copy of their newest album';
		if (creditTimer > 10) text = 'Once Upon A Shaolin';
		ctx.save();
		game.canvas.blackOverlay(ctx, width, height);
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		game.canvas.text(ctx, text, center.x, center.y, 20, 'white');
		ctx.restore();

		creditTimer += 1/60;
	}

	// resize, set width/height and origin
	var sizeCanvas = function() {
		canvas.width = width = 1024;
		canvas.height = height = 512;
		center.x = Math.floor(width/2);
		center.y = Math.floor(height/2);

		game.width = width;
		game.height = height;
		game.unit = width / 32;
		if (game.unit < 10) game.unit = 10;
	}

	// bkgd effects
	var set_bkgd = function(_image) {
		canvas.className = 'fight';
		canvas.style.backgroundImage = "url('" + _image + "')";
	}
	var clear_bkgd = function() {
		canvas.removeAttribute('class');
		canvas.removeAttribute('style');
	}
	var move_bkgd = function(_pos) {
		canvas.style.backgroundPositionX = _pos+'px';
	}

	return {
		init: init,
		update: update,
		over: over,
		sizeCanvas: sizeCanvas,
		scene: scene,
		set_bkgd: set_bkgd,
		clear_bkgd: clear_bkgd,
		move_bkgd: move_bkgd
	}
}();