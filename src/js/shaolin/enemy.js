/* enemy module */

'use strict';
var game = game || {};

game.enemy = function() {

	// set canvas boundaries
	var _width, _height;
	var _x, _y; // original x and y

	var height, width;
	var stats = {
		health: 20,
		strength: 8,
		stamina: 5,
		speed: 75
	};
	var x, y;

	var pattern;
	var range = 50;
	var direction = '';
	// var direction = {};
	// var dir = {
	// 	UP: 1,
	// 	DOWN: -1,
	// 	LEFT: -1,
	// 	RIGHT: 1
	// };

	var ctx;
	var dt = 1/60;

	var init = function(_ctx, borderWidth, borderHeight, _pattern, startX, startY) {
		// console.log('hello from: enemy');
		ctx = _ctx;
		_width = borderWidth;
		_height = borderHeight;
		_x = x = Math.floor(_width/2);
		_y = y = Math.floor(_height/2);
		if (startX) _x = x = startX;
		if (startY) _y = y = startY;

		setPattern(_pattern);
		// direction.x = dir.UP;
		// direction.y = dir.RIGHT;
		height = width = 25;
	}

	var setPattern = function(newPattern) {
		pattern = newPattern;
		if (pattern == 1) {
			direction = 'up';
		}
	}

	var update = function() {

		if (direction == 'up') y -= stats.speed * dt;
		if (direction == 'down') y += stats.speed * dt;

		// keep in range
		if (y < _y - range) {
			direction = 'down';
		} else if (y > _y + range) {
			direction = 'up';
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

	var getPosition = function() {
		return {
			x: x,
			y: y,
			height: height,
			width: width
		};
	}

	return {
		init: init,
		draw: draw,
		update: update,
		changeCtx: changeCtx,
		getPosition: getPosition
	}
}();