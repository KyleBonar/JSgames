

function ballObject(width, height, radius) {
    this.x = width / 2; //start in center x
    this.y = height / 2; //start in center y

    this.xspeed = -5; //initial velocty x
    this.yspeed = 1; //initial velocity y

    this.radius = radius; //radius

    this.update = function() {
        this.xspeed *= 1.0005; //speed up at game continues
        this.x += this.xspeed; //update x
        this.y += this.yspeed; //update y


        if (this.y < (0 + this.radius)) { //hit top
            this.yspeed = -this.yspeed;
        } else if (this.y > (canvas.height - this.radius)) {//hit bottom
            this.yspeed = -this.yspeed;
        } else if (this.y > p1.y && this.y < (p1.y + p1.height) && (this.x - this.radius) <= (p1.x + p1.width)) { //hit player paddle
            this.xspeed = -this.xspeed;
            ai.state = "mad"; //playing hitting ball makes ai mad
        } else if (this.y >= ai.y && this.y <= (ai.y + ai.height) && (this.x + this.radius) >= (ai.x)) { //hit ai paddle
            this.xspeed = -this.xspeed;
            ai.state = "happy"; //ai hitting ball makes ai happy
        } else if ( ( (this.x) < (p1.x + p1.width) || (this.x) > ai.x) && (this.xspeed != 0 && this.yspeed != 0) ) {  //if ball goes off screen
            this.xspeed = 0; //hold ball still
            this.yspeed = 0; //hold ball still
            var newXSpeed = Math.random() > 0.5 ? -5 : 5; //give either positive or negative x speed
            var newYSpeed = Math.random() > 0.5 ? (-1) * Math.floor((Math.random() * 4) + 1) : Math.floor((Math.random() * 4) + 1); //whole number between -4 and -1 OR 1 and 4      

            // gameContext.beginPath(); //new ball showing where crossed line
            // gameContext.fillStyle = "red";
            // gameContext.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
            // gameContext.fill();

            setTimeout(function() {
	            ball.x = width / 2; //reset to middle
	            ball.y = height / 2; //reset to middle
	            p1.resetPos();
	            ai.resetPos();
		        setTimeout(function() {
		            ball.xspeed = newXSpeed;
		            ball.yspeed = newYSpeed;
		        }, 1000);
	        }, 1000);

        } else {
         this.xspeed = this.xspeed;
         this.yspeed = this.yspeed;
        }
    }

    this.color = function() {
    	if(this.xspeed == 0 || this.yspeed == 0) {
    		return "red";
    	} else {
    		return "white";
    	}
    }

}

function player(height) {
    this.width = 10;
    this.height = 60;
    this.y = height / 2 - this.height / 2;
    this.x = 0;

    this.resetPos = function() {
        this.y = height / 2 - this.height / 2;
        this.x = 0;
    }
}

function computer(width, height) {
    this.width = 10;
    this.height = 60;
    this.y = height / 2 - this.height / 2;
    this.x = width - this.width;
    this.state = "mad"; //happy if just hit the ball, mad if opponent just hit the ball

    this.resetPos = function() {
        this.y = height / 2 - this.height / 2;
        this.x = width - this.width;
        this.state = "mad"; //reset state too
    }

    this.update = function() {
      if( this.state == "mad" && ball.xspeed != 0) { //check paddle state and see if ball is actually moving
        var y_distance = ball.y - (this.y + this.height / 2); //distance between ball and center of paddle
        if( y_distance > 30 ) {
            this.y += 3;
        } else if( y_distance > 20 ) {
            this.y += 2; //move ai down
        } else if( y_distance > 0){
            this.y += 1; //move down
        } else if( y_distance < -30) {
            this.y -= 3;
        } else if( y_distance < -20) {
            this.y -= 2;
        } else if( y_distance < 0) {
            this.y -= 1;
        }
      } else {
        this.y = this.y; //do nothing
      }
    }
}

document.onkeydown = function(e) {
    if (e.keyCode == 40 && p1.y < (canvas.height - p1.height)) { //if keypress is down and paddle doesn't leave canvas
        p1.y += 15;
    } else if (e.keyCode == 38 && p1.y > 0) { //keypress is uparrow and paddle doesn't leave canvas
        p1.y -= 15;
    }
}

var ball;
var p1;
var ai;

var canvas = document.createElement('canvas');
canvas.width = 640;
canvas.height = 400;
canvas.style.display = "block"; //make block
canvas.style.margin = "0 auto"; //center block on screen
canvas.id = "game-canvas";
document.getElementById('contentHolder').appendChild(canvas);



window.onload = function() {
    gameCanvas = document.getElementById("game-canvas");
    gameContext = gameCanvas.getContext('2d');
    ball = new ballObject(canvas.width, canvas.height, 5); //new ball object
    p1 = new player(canvas.height); //new player paddle object
    ai = new computer(canvas.width, canvas.height); //new computer paddle object
    draw();

    gameCanvas.addEventListener("click", function() {
       window.setInterval(draw, 1000 / 30); //update at 30 fps
    });
}

function draw() {



    gameContext.fillStyle = "black"; //board
    gameContext.fillRect(0, 0, gameCanvas.width, gameCanvas.height);

    gameContext.fillStyle = "white"; // player paddle
    gameContext.fillRect(p1.x, p1.y, p1.width, p1.height);

    gameContext.fillStyle = "white"; //ai paddle
    gameContext.fillRect(ai.x, ai.y, ai.width, ai.height);

    gameContext.beginPath(); //ball
    gameContext.fillStyle = ball.color();
    gameContext.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI, false);
    gameContext.fill();

    ball.update();
    ai.update();

}
