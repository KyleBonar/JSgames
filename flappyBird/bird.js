function Bird() {
	this.y = height/2;
	this.x = 25;
	this.r = 12;

	this.gravity = 0.6; //force down
	this.velocity = 0; //y-velocity only
	this.lift = -15; //force up

	this.isAlive = true;

	//draw bird
	this.show = function() {

		//top half of body
		fill('#e91640');
		noStroke();
		rect(this.x, this.y, this.r*2, this.r, 5, 5, 0, 0);

		//bottom half of body
		fill('#dc143c');
		noStroke();
		rect(this.x, this.y+this.r, this.r*2, this.r, 0, 0, 5, 5);

		//tail
		fill('#e91640');
		noStroke();
		triangle(this.x+(this.r/3), this.y+(this.r/2), this.x+(this.r/3), this.y+(this.r*4/3), this.x-(this.r*2/3), this.y+(this.r/2));
		
		//eye
		stroke(0,0,0);
		fill(255,255,255);
		ellipse(this.x+(this.r*3/2), this.y+(this.r*5/8), this.r*3/4, this.r*3/4);	
		
		//top beak
		noStroke();
		fill(255, 204, 0);
		triangle(this.x+(this.r*2), this.y+(this.r/2), this.x+(this.r*2), this.y+this.r, this.x+(this.r*8/3), this.y+(this.r/2));
		
		//bottom beak
		triangle(this.x+(this.r*2), this.y+this.r, this.x+(this.r*2), this.y+(this.r*3/2), this.x+(this.r*8/3), this.y+(this.r*3/2));
	
		fill(255,255,255);
	}

	//bird flap wings
	this.flap = function() {
		if(this.isAlive) {
			this.velocity += this.lift;
		}
	}

	//make bird fall with gravity
	this.update = function() {
		if(this.isAlive) {
			//gravity pulls bird down with air resistance
			this.velocity += this.gravity;
			this.velocity *=0.9;
			this.y += this.velocity;
			// this.y = mouseY;

			//if bird hits bottom, stop
			if (this.y + this.r*2 > height ) {
				this.y = height - this.r*2;
				this.velocity = 0; 
			}

			//if bird hits top, stop
			if (this.y < 0) {
				this.y = this.r;
				this.velocity = 0;

			}
		}
	}
}