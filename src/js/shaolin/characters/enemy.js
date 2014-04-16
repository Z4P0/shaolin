/* enemy module */

'use strict';
var game = game || {};

game.Enemy = function() {

	// x, y, pattern, range
	function Enemy(x, y, pattern, range, stats) {

		this.active = true;

		// set canvas boundaries
		this._width = game.width;
		this._height = game.height;
		
		// original x and y
		this._x = x;
		this._y = y;


		// height and width
		this.height = game.unit;
		this.width = game.unit;
		this.mapHeight = game.unit;
		this.mapWidth = game.unit;
		this.fightHeight = game.unit * 5;
		this.fightWidth = game.unit * 2;

		// position
		this.position = {
			x: x,
			y: y
		};

		// movement stuff
		this.speed = 100;
		// this.walkSpeed = 100;
		// this.runSpeed = 175;


		this.direction = '';
		this.pattern = pattern;
		this.patternSet = false;


		this.range = range;


		this.stats = stats;


		// sprite
		this.current_sprite = undefined;
		this.topview_sprite = undefined;
		this.fightview_sprite = undefined;

		this.checkBoundaries = function() {
			if (this.position.y < this._y - this.range) {
				this.direction = 'down';
			} else if (this.position.y > this._y + this.range) {
				this.direction = 'up';
			}
		}
	};




	// FUNCTIONS
	// ===================================
	var e = Enemy.prototype;

	e.update = function() {	
		if (!this.patternSet) {
			this.direction = setPattern(this.pattern);
			this.patternSet = true;
		}
		var dt = 1/60;

		if (this.direction == 'up') this.position.y -= this.speed * dt;
		if (this.direction == 'down') this.position.y += this.speed * dt;

		// keep in range
		// console.log(this);
		this.checkBoundaries();
	}

	e.mapSetup = function() {
		this.height = this.mapHeight;
		this.width = this.mapWidth;
	}

	e.fightSetup = function() {
		this.height = this.fightHeight;
		this.width = this.fightWidth;
	}

	e.attack = function() {
		createjs.Sound.play('sword');
		return this.stats.strength;
	}

	e.draw = function() {
		game.canvas.rect(game.ctx, this.position.x, this.position.y, this.width, this.height, game.COLORS.red);
	}

	e.moveTo = function(newX, newY) {
		this.position.x = newX;
		this.position.y = newY;
	}

	e.getPosition = function() {
		return {
			x: this.position.x,
			y: this.position.y,
			height: this.height,
			width: this.width
		};
	}

	e.getStats = function() {
		return this.stats;
	}

	e.takeDamage = function(_damage) {
		this.stats.damage += _damage;
		if (this.stats.health - this.stats.damage <= 0) this.active = false;
	}




	// "private"
	// ===================================
	function setPattern(_pattern) {
		var dir = ''
		if (_pattern == 1) dir = 'up';
		if (_pattern == 0) dir = 'left';
		return dir;
	};



	return Enemy;
}();