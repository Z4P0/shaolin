/* base module */

'use strict';
var game = game || {};

game.__ = function() {

	var init = function() {
		console.log('hello from: module');
	}

	return {
		init: init
	}
}();