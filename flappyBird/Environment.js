function Environment() {
	this.score = 0; //initialize to zero
	this.playerAlive = true;
	this.marginOfError = 2;

	this.background = function() {
		//score becomes more green w/ higher score
		background('rgb('+ (255-this.score*3) + ',255,' + (255-this.score*3) + ')');
	}

	this.showScore = function() {
		//background for score
		fill('rgba(210,210,210, .5)');
		stroke(0 ,0 ,0);
		rect( width/2-20, 0, 60, 50);

		//score
		textSize(32);
		fill(255, 0, 0);
		noStroke();
		text(this.score, width/2, 30);

	}
}