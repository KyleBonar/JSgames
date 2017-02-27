function Wall() {
	this.gapSize = 175; //size between top wall and bottom
	this.gapCenter = random(this.gapSize/2, height - this.gapSize);
	this.top = this.gapCenter - this.gapSize/2;
	this.bottom = this.gapCenter + this.gapSize/2;
	this.x = width; //always start on right side
	this.w = 50; //wall width
	this.velocity = 2; //x velocity
	this.isTouched = false; //wall hasn't been touched by default
}

Wall.prototype.show = function() {

	fill(51);
	
	//draw top wall
	rect(this.x, 0, this.w, this.top);
	//draw bottom wall
	rect(this.x, this.bottom, this.w, height - this.bottom);
}

Wall.prototype.update = function() {
	this.x -= this.velocity;
}

//check if wall and bird make contact
Wall.prototype.contact = function(bird, score) {
	//check x values
	if(bird.x+bird.r*2 - environment.marginOfError > this.x && bird.x < this.x + this.w) {
		//check y values
		if (bird.y + environment.marginOfError < this.top || bird.y+bird.r*2 - environment.marginOfError >  this.bottom) {		
			environment.playerAlive = false;
			environment.playerDeath = true;
		} 
	}
}