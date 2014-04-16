/* for the smoke sprites */

'use strict';
var game = game || {};

game.Smoke = function() {

	function Smoke(image, width, height, frameWidth, frameHeight, frameDelay) {
		this.x = 0;
		this.y = 0;
		this.width = width;
		this.height = height;
		this.image = image;
		this.color = "red";
		this.active = true;

		
		// new
		this.frameWidth = frameWidth;
		this.frameHeight = frameHeight;
		this.frameDelay = frameDelay;
		this.image.width = width;
		this.image.height = height;
		this.numCols = Math.floor(this.image.width/this.frameWidth);
		this.numRows = Math.floor(this.image.height/this.frameHeight);

		this.totalFrames = this.numCols * this.numRows;
		this.frameIndex = 0;
		this.lastTime = 0;
	
	};
		

	var p = Smoke.prototype;
	
	p.draw = function(ctx) {
		var halfW = this.width/2;
		var halfH = this.height/2;
		if(!this.image){
			ctx.fillStyle = this.color;
			ctx.fillRect(this.x - halfW, this.y - halfH, this.width, this.height);
			
		} else{
			// ctx.drawImage(this.image, this.x - halfW, this.y - halfH, this.width, this.height);
			// ctx.drawImage(this.image, 52, 98, 17, 20, this.x - halfW, this.y - halfH, this.width, this.height);
			// sprite animation
			var col = this.frameIndex % this.numCols;
			var row = Math.floor(this.frameIndex / this.numCols);
			var imageX = col * this.frameWidth;
			var imageY = row * this.frameHeight;
			ctx.drawImage(this.image, imageX, imageY, this.frameWidth, this.frameHeight, this.x - halfW, this.y - halfH, this.width, this.height);
		}
  };
	
  p.update = function(dt) {
		// this.x += this.xVelocity * dt;
		// this.y += this.yVelocity * dt;
		this.lastTime += dt;
		if(this.lastTime >= this.frameDelay){
			this.lastTime = 0;
			this.frameIndex ++;
		}
		if(this.frameIndex >= this.totalFrames){

			//this.frameIndex = 0; // if we wanted to loop
			this.active = false;
		}
  };
	  
	
	return Smoke;
}();