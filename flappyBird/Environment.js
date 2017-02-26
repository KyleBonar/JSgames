function Environment() {
	this.score = 0; //initialize to zero
	this.playerAlive = false; //player must start game first
	this.marginOfError = 2; //this value helps the game to feel more fluid when checking for contact
	this.playerDeath = false;

	this.background = function() {
		if(this.playerAlive && !this.playerDeath) {
			//score becomes more green w/ higher score
			background('rgb('+ (240-this.score*3)%256 + ',240,' + (240-this.score*3)%256 + ')');
		} else if (this.playerDeath) {
			//same background as when alive
			background('rgb('+ (240-this.score*3)%256 + ',240,' + (240-this.score*3)%256 + ')');

			//show right side
			fill(51);
			rect(width/2, 0, width/2, height);
			textSize(32);
			textAlign(LEFT);
			if(this.score != 0) {
				fill('green');
				text("Score: " + this.score, width*9/16, height/6);
			}
			fill(255);	
			text("Press spacebar to RESET the game!", width*9/16, height/4, width-width*9/16, height);
		
		} else {
			//generic background
			background('rgb(240,240,240)');

			//circle around bird
			noStroke();
			fill('rgba(240, 230, 140, 0.8)');
			ellipse(bird.x+bird.r, bird.y+bird.r, 100, 100);
		
			//text on right side
			fill(51);
			rect(width/2, 0, width/2, height);
			textSize(32);
			textAlign(LEFT);
			if(this.score != 0) {
				fill('green');
				text("Score: " + this.score, width*9/16, height/6);
			}
			fill(255);
			text("Press spacebar to START the game!", width*9/16, height/4, width-width*9/16, height);
		}	
	}

	this.showScore = function() {
		//background for score
		fill('rgba(210,210,210, .5)');
		stroke(0 ,0 ,0);
		rect( width/2-30, 0, 60, 40);

		//score
		textSize(32);
		fill(255, 0, 0);
		noStroke();
		textAlign(CENTER);
		text(this.score, width/2, 30);
	}

	this.reset = function() {
		this.score = 0;
	}

}