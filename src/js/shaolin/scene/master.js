/* scene master */

'use strict';
var game = game || {};

game.scene = {
	// our own refernce to hero
	hero: undefined,
	init: function(_hero) {
		this.hero = _hero;
	},

	// current chamber (level)
	current: '',
	set: function(_numeral) {
		this.current = _numeral;
	},
	get: function() {
		return this.current;
	},


	// level settings
	walls: undefined,

	prep: function(_settings) {
		// place the hero
		this.hero.moveTo(_settings.start_point.x, _settings.start_point.y);

		// level enemies
		game.enemies = []; // empty enemies from previous chamber
		// make new enemies
		for (var i = 0; i < _settings.enemies.length; i++) {
			var enemy = game.enemy;
			enemy.init(game.ctx, game.width, game.height, 1, _settings.enemies[i].x, _settings.enemies[i].y);
			game.enemies.push(enemy);			
		};

		// walls
		this.walls = _settings.walls;
	},

	drawWalls: function() {
		for (var i = 0; i < this.walls.length; i++) {
			game.canvas.rect(game.ctx, this.walls[i].x, this.walls[i].y, this.walls[i].w, this.walls[i].h, game.COLORS.black);
		};
	}
};