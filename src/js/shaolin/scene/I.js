/* scene I */

'use strict';
var game = game || {};

game.scene.I = {

	// either exploring or fighting
	mode: 'exploring',
	// bkgd images
	map_bkgd: undefined,
	fight_bkgd: undefined,

	setup: function() {
		// set bkgd
		var fightImageBkgd = new Image();
		fightImageBkgd.src = game.IMAGES['dusk'];
		fight_bkgd = fightImageBkgd;
		// fight bkgd will be a simple map
		// var fightImageBkgd = new Image();
		// fightImageBkgd.src = game.IMAGES['dusk'];
		// fight_bkgd = fightImageBkgd;

		// make 1 enemy
		var enemy = game.enemy;
		enemy.init(game.ctx, width, height, 1);
		game.enemies.push(enemy);
	},

	play: function() {
		// bkgd
		drawBkgd();

		// draw character
		hero.update();
		hero.draw();

		// update
		for (var i = 0; i < game.enemies.length; i++) {
			game.enemies[i].update();
		};
		// draw enemy
		for (var i = 0; i < game.enemies.length; i++) {
			game.enemies[i].draw();
		};
	},

	drawBkgd: function() {
		if (mode == 'exploring') {
			game.canvas.rect(ctx, 0, 0, canvas.width, canvas.height, game.COLORS.blue);
		} else {
			ctx.drawImage(fight_bkgd, 0, 0, width, height);
		}
	}


};