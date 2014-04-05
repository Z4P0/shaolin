/* our hero */

'use strict';
var game = game || {};

game.hero = function() {
	// square for now
	var height = 25;
	var width = 25;
	// position
	var x = 250;
	var y = 250;
	var speed;
	var walkSpeed = 100;
	var runSpeed = 175;
	var dt = 1/60;
	// sprite
	var sprite;

	// border
	var _width, _height;

	var init = function(borderW, borderH) {
		speed = walkSpeed;
		_width = borderW;
		_height = borderH;
	}

	var attack = function() {
		console.log('hywah');
	}


	// update position
	var update = function () {
		// shift --> run
		if (game.keyPressed[game.KEYBOARD.SHIFT]) speed = runSpeed;

		if (game.keyPressed[game.KEYBOARD.UP]) {
			y -= speed * dt;
		}
		if (game.keyPressed[game.KEYBOARD.DOWN]) {
			y += speed * dt;
		}
		if (game.keyPressed[game.KEYBOARD.LEFT]) {
			x -= speed * dt;
		}
		if (game.keyPressed[game.KEYBOARD.RIGHT]) {
			x += speed * dt;
		}

		// keep inside canvas
		checkBoundaries();

		// reset speed
		speed = walkSpeed;
	}

	// draw self
	var draw = function () {
		game.canvas.rect(game.ctx, x, y, width, height, game.COLORS.yellow);
	}

	var checkBoundaries = function () {
		// x
		if (x > _width - width) x = _width - width;
		if (x < 0) x = 0;
		// y
		if (y > _height - height) y = _height - height;
		if (y < 0) y = 0;
	}

	return {
		init: init,
		update: update,
		draw: draw,
		attack: attack
	}
}();