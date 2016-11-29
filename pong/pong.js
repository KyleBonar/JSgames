
var canvas = document.createElement('canvas');
canvas.width = "640";
canvas.height = "480";
canvas.id = "game-canvas";
document.body.appendChild(canvas);


var p1_width = ai_width = 10; 
var p1_height = ai_height = 60;
var ball_radius = 5;
var ball_x_v =4; //initial velocity in x
var ball_y_v = -4; //initial velocity in y

var p1_y = ai_y = canvas.height/2 - p1_height/2; //middle of board plus middle of paddle height
var ball_y = canvas.height/2; 
var ball_x = canvas.width/2;

window.onload = function() {
	gameCanvas = document.getElementById("game-canvas");
	gameContext = gameCanvas.getContext('2d');
	setInterval(update,1000/30); //update at 30 fps
}

function update() {
	ball_x += ball_x_v;
	ball_y += ball_y_v;

	// if(ai_y>0 && (ai_y+ai_height)<canvas.height) {
		ai_y = ball_y-(ai_height/2);
		// p1_y = ball_y-(p1_height/2);
	// }
	// console.log(ai_y);
	
	if(ball_y < (0+ball_radius) && ball_y_v<0 ){ //if ball hits top of canvas AND ball is going upwards
		ball_y_v = -ball_y_v;
	}
	
	if( ball_y > (canvas.height-ball_radius) && ball_y_v > 0) { //if ball hits bottom of canvas AND ball is going downwards
		ball_y_v = -ball_y_v;
	}

	if( (ball_x-ball_radius)<=p1_width ) { //if ball could have hit paddle
		if(ball_y < p1_y || ball_y > (p1_y+p1_height) ) { //check if above or below paddle
			//do nothing
		}
		else { //ball hit paddle

			ball_x_v = -ball_x_v;
		}

	}

	if( (ball_x+ball_radius) > (canvas.width - ai_width) ){
		if( ball_y < ai_y || ball_y > (ai_y+ai_height) ) {
			//do nothing 
			//incriment score??
		}
		else {
			ball_x_v = -ball_x_v;
		}
		
	}

	if( (ball_x-ball_radius) < 0 || (ball_x+ball_radius) > canvas.width) { //reset ball
		ball_y = canvas.height/2; 
		ball_x = canvas.width/2;
	}

	document.onkeydown = function(e) {
		if(e.keyCode == 40 && p1_y < (canvas.height-p1_height) ) { //if keypress is down and paddle doesn't leave canvas
			p1_y +=15;
		}
		else if(e.keyCode == 38 && p1_y > 0) { //keypress is uparrow and paddle doesn't leave canvas
			p1_y -=15; 
		}
	}

	gameContext.fillStyle = "black"; //board
	gameContext.fillRect(0,0,gameCanvas.width,gameCanvas.height);

	gameContext.fillStyle="white"; // player paddle
	gameContext.fillRect(0, p1_y, p1_width, p1_height);

	gameContext.fillStyle="white"; //ai paddle
	gameContext.fillRect(canvas.width-ai_width, ai_y, ai_width, ai_height);

	// gameContext.fillStyle = "white"; //ball
	// gameContext.fillRect(ball_x, ball_y, ball_width, ball_height);

	
	gameContext.beginPath();
	gameContext.fillStyle = "white";
	gameContext.arc(ball_x, ball_y, ball_radius, 0, 2*Math.PI, false );
	gameContext.fill();

}