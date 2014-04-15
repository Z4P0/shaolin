/* our hero */

'use strict';
var game = game || {};

game.hero = function() {
	// border
	var _width, _height;

	// height info
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
	
	// speed stuff
	var speed;
	var walkSpeed = 100;
	var runSpeed = 175;

	// sprite
	var current_sprite = undefined;
	var topview_sprite = undefined;
	var fightview_sprite = undefined;


	// stats
	var stats = {
		health: 50,
		strength: 15,
		stamina: 10,
		speed: 10,
		damage: 0
	}

	// weapons
	var currentWeapon = undefined;
	var weapons = {
		stars: false,
		sword: false
	};
	
	// abilities
	var currentAttack = undefined;
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





	var init = function(borderW, borderH) {
		// set walking speed
		speed = walkSpeed;
		
		// set boundries
		_width = borderW;
		_height = borderH;
		height = mapHeight;
		width = mapWidth;

		// default to center of map
		position.x = Math.floor(borderW/2);
		position.y = Math.floor(borderH/2); 
	}



	var attack = function() {
		// console.log('hywah - ' + currentWeapon);
		console.log('wut');
		currentAttack();
		createjs.Sound.play('sword');
		return stats.strength;
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


	var counter = function() {
		if (game.keyPressed[game.KEYBOARD.SPACE]) return true;
	}


	// update position
	var update = function () {
		// shift --> run
		if (game.keyPressed[game.KEYBOARD.SHIFT]) speed = runSpeed;

		// move
		var dt = 1/60;
		if (game.keyPressed[game.KEYBOARD.UP]) position.y -= speed * dt;
		if (game.keyPressed[game.KEYBOARD.DOWN]) position.y += speed * dt;
		if (game.keyPressed[game.KEYBOARD.LEFT]) position.x -= speed * dt;
		if (game.keyPressed[game.KEYBOARD.RIGHT]) position.x += speed * dt;

		// keep inside canvas
		checkBoundaries();

		// reset speed
		speed = walkSpeed;
	}

	var fightSetup = function() {
		height = fightHeight;
		width = fightWidth;
	}

	var fight = function(key) {

		if (game.keyPressed[key]) {
			// attack
			if (game.keyPressed[game.KEYBOARD.A]) {
				// punch();
				currentAttack = punch;
				return true;
			}
			if (game.keyPressed[game.KEYBOARD.S]) {
				// kick();
				currentAttack = kick;
				return true;
			}
			if (game.keyPressed[game.KEYBOARD.D]) {
				// shadowBomb();
				currentAttack = shadowBomb;
				return true;
			}
		}

		if (game.keyPressed[game.KEYBOARD.SHIFT]) {
			console.log('show items');
		}
	}


	// draw self
	var draw = function () {
		game.canvas.rect(game.ctx, position.x, position.y, width, height, game.COLORS.yellow);
	}

	var checkBoundaries = function () {
		// x
		if (position.x > _width - width) position.x = _width - width;
		if (position.x < 0) position.x = 0;
		// y
		if (position.y > _height - height) position.y = _height - height;
		if (position.y < 0) position.y = 0;
	}

	var moveTo = function(_x, _y) {
		position.x = _x;
		position.y = _y;
	}

	var getPosition = function() {
		return {
			x: position.x,
			y: position.y,
			width: width,
			height: height
		}
	}

	var getStats = function() {
		return stats;
	}

	var takeDamage = function(_damage) {
		stats.damage += _damage;
	}

	return {
		init: init,
		update: update,
		draw: draw,
		attack: attack,
		fight: fight,
		fightSetup: fightSetup,
		moveTo: moveTo,
		getPosition: getPosition,
		getStats: getStats,
		takeDamage: takeDamage,
		counter: counter
	}
}();