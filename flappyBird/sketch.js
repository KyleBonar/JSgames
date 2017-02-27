var environment, bird;
var walls = [];

function setup() {
	createCanvas(400, 500);
	bird = new Bird();
	environment = new Environment();
}

function draw() {

	//game being actively played
	if(environment.playerAlive && !environment.playerDeath) {
		environment.background();
		bird.update(environment.playerAlive, environment.playerDeath);
		bird.drawBird();	

		//every 100 frames make a new pipe
		if(frameCount % 100 == 0) {
			walls.push(new Wall());
		}

		//loop through all walls
		for( var i = walls.length - 1; i >= 0; i--) {
			walls[i].update();
			walls[i].show();

			walls[i].contact(bird, environment);

			//remove wall if off screen
			if(walls[i].x + walls[i].w < 0) {
				//increase and decrease score accordingly
				if(walls[i].isTouched) {

				} else {
					environment.score++;
				}
				walls.splice(i, 1);
			}
		
		}
		environment.showScore();

	} else if(environment.playerDeath) {
		//player died


		environment.background();
		bird.drawBird();	
		walls[0].show();
	
	} else { 
		//player reset game
		
		//reset bird and clear wall
		// walls = [];

		environment.background();
		bird.update(environment.playerAlive, environment.playerDeath);
		bird.drawBird();
	}
	
}

//p5 native function to get keyboard press
function keyPressed() {

	//spacebar
	if (key == ' ') {
		//only reset score when player is currently dead and about to become alive

		if()
		if(!environment.playerAlive) {
			environment.reset();
		}
		
		environment.playerAlive = true;
		bird.flap(environment.playerAlive);
	}
}