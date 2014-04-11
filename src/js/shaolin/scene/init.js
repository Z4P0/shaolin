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
		current: current,
		set: set,
		get: get
	}
}();