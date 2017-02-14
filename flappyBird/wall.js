function Wall() {
	this.gapSize = 175; //size between top wall and bottom
	this.gapCenter = random(this.gapSize/2, height - this.gapSize);
	this.top = this.gapCenter - this.gapSize/2;
	this.bottom = this.gapCenter + this.gapSize/2;
	this.x = width; //always start on right side
	this.w = 50; //wall width
	this.velocity = 2; //x velocity
	this.isTouched = false; //wall hasn't been touched by default

	this.show = function() {
		if(this.isTouched){
			fill("red");
		} else {
			fill(255);
		}
		
		//draw top wall
		rect(this.x, 0, this.w, this.top);
		//draw bottom wall
		rect(this.x, this.bottom, this.w, height - this.bottom);
	}

	this.update = function() {
		this.x -= this.velocity;
	}

	//check if wall and bird make contact
	this.contact = function(bird, score) {
		//check x values
		if(bird.x+bird.r > this.x && bird.x-bird.r < this.x + this.w) {
			//check y values
			if (bird.y-bird.r < this.top || bird.y+bird.r >  this.bottom) {		
				this.isTouched = true; //will change wall to red
			} 
		}
	}
}