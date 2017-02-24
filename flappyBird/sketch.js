var environment, bird;
var walls = [];

function setup() {
	createCanvas(400, 500);
	bird = new Bird();
	environment = new Environment();
}

function draw() {
	environment.background();
	bird.update();
	bird.show();

	if(environment.playerAlive) {
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
	}

	environment.showScore();
	
}

//p5 function to get keyboard press
function keyPressed() {
	if (key == ' ') {
		bird.flap();
	}
}