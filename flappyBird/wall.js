function Wall() {
	this.gapSize = 50; //size between top wall and bottom
	this.top = random(height/2);
	this.bottom = random(height/2);
	this.x = width; //always start on right side
	this.w = 20; //wall width
	this.velocity = 2; //x velocity
	this.touched = false; //wall hasn't been touched by default

	this.show = function() {
		if(this.touched){
			fill("red");
		} else {
			fill(255);
		}
		
		rect(this.x, 0, this.w, this.top);
		rect(this.x, height-this.bottom, this.w, this.bottom);
	}

	this.update = function() {
		this.x -= this.velocity;
	}

	//check if wall and bird make contact
	this.contact = function(bird) {
		//check x values
		if(bird.x+bird.r > this.x && bird.x-bird.r < this.x + this.w) {
			//check y values
			if (bird.y-bird.r < this.top || bird.y+bird.r > height - this.bottom) {		
				this.touched = true;
				return true;
			}
		} else {
			return false;
		}
	}
}