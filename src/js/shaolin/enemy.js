/* enemy module */

'use strict';
var game = game || {};

game.enemy = function() {

	var height, width;
	var health;
	var damage;
	var speed;
	var x, y;
	
	var init = function() {
		console.log('hello from: enemy');
	}

	return {
		init: init
	}
}();