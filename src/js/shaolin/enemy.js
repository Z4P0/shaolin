/* enemy module */

'use strict';
var game = game || {};

game.enemy = function() {

	// set canvas boundaries
	var _width, _height;
	var _x, _y; // original x and y


	// height and width
	var height = 0;
	var width = 0;
	var mapHeight = 25;
	var mapWidth = 25;
	var fightHeight = 150;
	var fightWidth = 50;

	// position
	var position = {
		x: 0,
		y: 0
	};

	// movement stuff
	var speed;
	var walkSpeed = 100;
	var runSpeed = 175;

	// sprite
	var current_sprite = undefined;
	var topview_sprite = undefined;
	var fightview_sprite = undefined;

	var pattern;
	var range = 50;
	var direction = '';


	var stats = {
		health: 25,
		strength: 10,
		stamina: 5,
		speed: 10,
		damage: 0
	};
	// drawiing stuff
	var ctx;



	var init = function(_ctx, borderWidth, borderHeight, _pattern, startX, startY) {
		ctx = _ctx;
		_width = borderWidth;
		_height = borderHeight;

		// set enemy position
		// default = center
		_x = position.x = Math.floor(_width/2);
		_y = position.y = Math.floor(_height/2);
		// if we passed in an X and Y use them
		if (startX) _x = position.x = startX;
		if (startY) _y = position.y = startY;

		setPattern(_pattern);
		speed = walkSpeed;

		height = mapHeight;
		width = mapWidth;
	}

	var setPattern = function(newPattern) {
		pattern = newPattern;
		if (pattern == 1) {
			direction = 'up';
		}
	}

	var update = function() {	
		var dt = 1/60;

		if (direction == 'up') position.y -= speed * dt;
		if (direction == 'down') position.y += speed * dt;

		// keep in range
		checkBoundaries();
	}

	var checkBoundaries = function() {
		if (position.y < _y - range) {
			direction = 'down';
		} else if (position.y > _y + range) {
			direction = 'up';
		}
	}

	var fightSetup = function() {
		// fight stuffs
		height = fightHeight;
		width = fightWidth;
	}

	var attack = function() {
		return stats.strength;
	}

	var draw = function() {
		game.canvas.rect(ctx, position.x, position.y, width, height, game.COLORS.red);
	}
	var changeCtx = function(newCtx) {
		// if we wanted to use the off-screen canvas technique
		ctx = newCtx;
	}

	var moveTo = function(newX, newY) {
		position.x = newX;
		position.y = newY;
	}

	var getPosition = function() {
		return {
			x: position.x,
			y: position.y,
			height: height,
			width: width
		};
	}

	var getStats = function() {
		return stats;
	}

	var takeDamage = function(_damage) {
		stats.damage += _damage;
	}


	return {
		init: init,
		draw: draw,
		update: update,
		fightSetup: fightSetup,
		fight: fight,
		changeCtx: changeCtx,
		moveTo: moveTo,
		getPosition: getPosition,
		getStats: getStats,
		takeDamage: takeDamage,
		attack: attack
	}
}();