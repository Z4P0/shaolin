/* scene master */

'use strict';
var game = game || {};

game.scene = {
	current: '',

	set: function(_numeral) {
		this.current = _numeral;
	},
	get: function() {
		return this.current;
	}
};