/* enemy module */

'use strict';
var game = game || {};

game.enemy = function() {

	// set canvas boundaries
	var _width, _height;

	var height, width;
	var stats = {
		health: 20,
		strength: 8,
		stamina: 5,
		speed: 8
	};
	var x, y;

	var pattern;
	var direction = {};
	var dir = {
		UP: 1,
		DOWN: -1,
		LEFT: -1,
		RIGHT: 1
	};

	var ctx;
	var dt = 1/60;

	var init = function(_ctx, borderWidth, borderHeight, _pattern) {
		// console.log('hello from: enemy');
		ctx = _ctx;
		_width = borderWidth;
		_height = borderHeight;
		x = Math.floor(_width/2);
		y = Math.floor(_height/2);
		direction.x = dir.UP;
		direction.y = dir.RIGHT;
		height = width = 25;
		pattern = _pattern;
	}
	var update = function() {
		if (pattern == 1) {
			// up and down
			y -= stats.speed * dt;
		}

	}
	var draw = function() {
		// console.log(game.COLORS);
		// console.log(game.COLORS.blue);
		game.canvas.rect(ctx, x, y, width, height, game.COLORS.red);
	}
	var changeCtx = function(newCtx) {
		// if we wanted to use the off-screen canvas technique
		ctx = newCtx;
	}

	return {
		init: init,
		draw: draw,
		update: update,
		changeCtx: changeCtx
	}
}();