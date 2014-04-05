// canvas.js - slightly modified draw.js

'use strict';
var game = game || {};

game.canvas = function() {

	var clear = function(ctx, x, y, w, h) {
		ctx.clearRect(x, y, w, h);
	}
	
	var rect = function(ctx, x, y, w, h, col) {
		ctx.fillStyle = col;
		ctx.fillRect(x, y, w, h);
	}
	
	var circle = function(ctx, x, y, r, col) {
		ctx.fillStyle = col;
		ctx.beginPath();
		ctx.arc(x + 5, y + 5, r, 0,  Math.PI * 2, true);
		ctx.closePath();
		ctx.fill();
	}
	
	var text = function(ctx, string, x, y, size, col) {
		ctx.font = 'bold '+size+'px Monospace';
		ctx.fillStyle = col;
		ctx.fillText(string, x, y);
	}
	
	var backgroundGradient = function(ctx, width, height){
		// Create gradient - top to bottom
		
			
		// change this to fill entire ctx with gradient
		// ctx.fillStyle="purple";
		// ctx.fillRect(0,0,width,height);

		var grd = ctx.createLinearGradient(0, 0, 0, height);
		// light blue
		grd.addColorStop(0, '#8ED6FF');   
		// dark blue
		grd.addColorStop(1, '#004CB3');
		ctx.fillStyle = grd;
		ctx.fill();
		ctx.fillRect(0,0,width,height);
		
	}

	return {
		clear: clear,
		rect: rect,
		circle: circle,
		text: text,
		backgroundGradient: backgroundGradient
	}
			
}();