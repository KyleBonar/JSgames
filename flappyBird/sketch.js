var bird;
var walls = [];
function setup() {
	createCanvas(400, 500);
	bird = new Bird();
	
}

function draw() {
	background(0);
	bird.update();
	bird.show();

	//every 100 frames make a new pipe
	if(frameCount % 100 == 0) {
		walls.push(new Wall());
	}

	//loop through all walls
	for( let i = walls.length - 1; i >= 0; i--) {
		walls[i].update();
		walls[i].show();

		if(walls[i].contact(bird)) {
			console.log("made contact");
		}

		//remove wall if off screen
		if(walls[i].x + walls[i].w < 0) {
			walls.splice(i, 1);
		}
	} 
}

//p5 function to get keyboard press
function keyPressed() {
	if (key == ' ') {
		bird.flap();
	}
}