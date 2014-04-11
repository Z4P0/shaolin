/* our hero */

'use strict';
var game = game || {};

game.hero = function() {
	// square for now
	var height = 25;
	var width = 25;
	// position
	var x = undefined;
	var y = undefined;
	var speed;
	var walkSpeed = 100;
	var runSpeed = 175;
	var dt = 1/60;
	// sprite
	var sprite;


	// stats
	var stats = {
		health: 50,
		strength: 15,
		stamina: 5,
		speed: 8
	}

	// weapons
	var currentWeapon;
	var weapons = {
		stars: false,
		sword: false
	};
	
	// abilities
	var abilities = {
		stealth : false,
		punch: true,
		kick: true,
		fire: false,
		electricity: false,
		teleport: false
	};

	var items = {
		health: 1,
		shadowBomb: 0
	};

	// border
	var _width, _height;





	var init = function(borderW, borderH) {
		speed = walkSpeed;
		_width = borderW;
		_height = borderH;
		x = Math.floor(borderW/2);
		y = Math.floor(borderH/2); 
		currentWeapon = undefined;
	}

	var moveTo = function(_x, _y) {
		x = _x;
		y = _y;
	}

	var getPosition = function() {
		return {x: x, y: y}
	}


	var attack = function() {
		console.log('hywah - ' + currentWeapon);
		createjs.Sound.play('sword');
	}
	var punch = function() {
		console.log('punch');
		createjs.Sound.play('punch');
	}
	var kick = function() {
		console.log('kick');
		createjs.Sound.play('kick');
	}
	var shadowBomb = function() {
		if (shadowBomb > 0) {
			console.log('shadow-bomb');
			shadowBomb--;		
		}
	}


	// update position
	var update = function () {
		// shift --> run
		if (game.keyPressed[game.KEYBOARD.SHIFT]) speed = runSpeed;

		// move
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

		// attack
		if (game.keyPressed[game.KEYBOARD.A]) {
			punch();
		}
		if (game.keyPressed[game.KEYBOARD.S]) {
			kick();
		}
		if (game.keyPressed[game.KEYBOARD.D]) {
			shadowBomb();
		}
		if (game.keyPressed[game.KEYBOARD.SPACE]) {
			attack();
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
		attack: attack,
		moveTo: moveTo,
		getPosition: getPosition
	}
}();