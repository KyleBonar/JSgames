var canvasElement = document.createElement('canvas');
canvasElement.width = 900;
canvasElement.height = 900;
canvasElement.id = "game-canvas";
document.getElementById("contentHolder").appendChild(canvasElement);
canvas = document.getElementById("game-canvas");
canvasArea = canvas.getContext('2d');
canvasArea.fillStyle = "rgb(0,0,0)"; //board
canvasArea.fillRect(0,0,canvas.width,canvas.height);

var phi; //angle
var r; //radius
var n; //ordering number (?)
var c; //scaling factor
var flower;
var flowers = [];

canvas.addEventListener("click", function() {
  var mouseX = event.clientX;
  var mouseY = event.clientY;

  c = 10;
  var flower = {
    startX: mouseX,
    startY: mouseY,
    x: 0,
    y: 0,
    phi: 0,
    n: 0
  }

  console.log(mouseX+" "+event.screenX);
  flowers.push(flower);
  //setInterval(drawFlower, 1000/20); //refresh 10 fps

});



function drawFlower() {


  for(let i = 0, length = flowers.length; i < length; i++) {

    flowers[i].phi = flowers[i].n * 137.3; //formula from paper -- need to change to radians
    flowers[i].r   = c * Math.sqrt(flowers[i].n);
    flowers[i].x   = flowers[i].r * Math.cos(flowers[i].phi * 180 / Math.PI) + canvas.width/2;
    flowers[i].y   = flowers[i].r * Math.sin(flowers[i].phi * 180 / Math.PI) + flowers[i].startY;
    flowers[i].n   = flowers[i].n + 1;

    // if(flowers[i].n === 50){ //stop drawing
    //   flowers[i].phi = 0;
    //   flowers[i].r   = 0;
    //   flowers[i].x   = 0;
    //   flowers[i].y   = 0;
    //   flowers[i].n   = 50;
    // } else {
      canvasArea.beginPath(); //ball
      canvasArea.fillStyle = "rgb("+ flowers[i].r % 255 +",255,255)";//change color based on radius
      canvasArea.arc(flowers[i].x, flowers[i].y, 7, 0, 2 * Math.PI, false);
      canvasArea.fill();
    // }


  }



}
