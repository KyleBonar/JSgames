function Bird() {
	this.y = height/2;
	this.x = 25;
	this.r = 12;

	this.gravity = 0.6; //force down
	this.velocity = 0; //y-velocity only
	this.lift = -15; //force up


	//draw bird
	this.show = function() {
		fill(255);
		ellipse(this.x, this.y, this.r*2, this.r*2);
	}

	//bird flap wings
	this.flap = function() {
		this.velocity += this.lift;
	}

	//make bird fall with gravity
	this.update = function() {

		//gravity pulls bird down with air resistance
		this.velocity += this.gravity;
		this.velocity *=0.9;
		this.y += this.velocity;

		//if it hits bottom, stop
		if (this.y > height - this.r) {
			this.y = height - this.r;
			this.velocity = 0; 
		}

		//if it hits top, stop
		if (this.y < this.r) {
			this.y = this.r;
			this.velocity = 0;

		}
	}
}