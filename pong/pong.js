var canvas = document.createElement('canvas');
canvas.width = 640;
canvas.height = 400;
canvas.id = "game-canvas";
document.body.appendChild(canvas);

function ballObject(width, height, radius) {
    this.x = width / 2; //start in center x
    this.y = height / 2; //start in center y

    this.xspeed = -5; //initial velocty x
    this.yspeed = -1; //initial velocity y

    this.radius = radius; //radius

    this.update = function() {
        this.x += this.xspeed; //update x
        this.y += this.yspeed; //update y

        //hit top
        if (this.y < (0 + this.radius)) {
            this.yspeed = -this.yspeed;
        }

        //hit bottom
        if (this.y > (canvas.height - this.radius)) {
            this.yspeed = -this.yspeed;
        }

        //hit player paddle
        if (this.y >= p1.y && this.y <= (p1.y + p1.height) && (this.x - this.radius) <= (p1.x + p1.width)) {
            this.xspeed = -this.xspeed;
        }

        //hit ai paddle
        if (this.y >= ai.y && this.y <= (ai.y + ai.height) && (this.x + this.radius) >= (ai.x)) {
            this.xspeed = -this.xspeed;
        }

        //if ball goes off screen
        if (this.x < 0 || this.x > canvas.width) {
            this.x = width / 2;
            this.y = height / 2;
            this.xspeed = Math.random() > 0.5 ? -5 : 5; //give either positive or negative -4 depending on random number
            this.yspeed = Math.random() > 0.5 ? (-1) * Math.floor((Math.random() * 4) + 1) : Math.floor((Math.random() * 4) + 1);
            p1.resetPos();
            ai.resetPos();
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

    this.resetPos = function() {
        this.y = height / 2 - this.height / 2;
        this.x = width - this.width;
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

window.onload = function() {
    gameCanvas = document.getElementById("game-canvas");
    gameContext = gameCanvas.getContext('2d');

    ball = new ballObject(canvas.width, canvas.height, 5); //new ball object
    p1 = new player(canvas.height); //new player paddle object
    ai = new computer(canvas.width, canvas.height); //new computer paddle object

    setInterval(draw, 1000 / 30); //update at 30 fps
}

function draw() {

    ai.y = ball.y - (ai.height / 2);
    ball.update();

    gameContext.fillStyle = "black"; //board
    gameContext.fillRect(0, 0, gameCanvas.width, gameCanvas.height);

    gameContext.fillStyle = "white"; // player paddle
    gameContext.fillRect(p1.x, p1.y, p1.width, p1.height);

    gameContext.fillStyle = "white"; //ai paddle
    gameContext.fillRect(ai.x, ai.y, ai.width, ai.height);

    gameContext.beginPath();
    gameContext.fillStyle = "white";
    gameContext.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI, false);
    gameContext.fill();


    // gameContext.fillStyle = "white"; //ball
    // gameContext.fillRect(ball_x, ball_y, ball_width, ball_height);




}
