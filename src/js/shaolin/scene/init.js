/* scene handler */

'use strict';
var game = game || {};

game.scene = function() {
	var current = '';

	var set = function(_numeral) {
		current = _numeral;
	}
	var get = function() {
		return current;
	}

	return {
		set: set,
		get: get
	}
}();