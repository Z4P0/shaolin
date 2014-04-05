'use strict';
var game = game || {};

game._ = function() {
	
	var init = function() {
		console.log('hello from: Game Manager');
	}

	return {init: init}
}();