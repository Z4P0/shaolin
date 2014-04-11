/* scene 2 */

'use strict';
var game = game || {};

game.scene.II = {

	// either exploring or fighting
	mode: 'exploring',

	init: function() {
		console.log('hello from: scene II');
	},

	update: function() {
		console.log('hello from: update');
	}

};