var canvasElement = document.createElement('canvas');
canvasElement.width = 900;
canvasElement.height = 900;
canvasElement.id = "game-canvas";
document.getElementById("contentHolder").appendChild(canvasElement);
canvas = document.getElementById("game-canvas");
canvasArea = canvas.getContext('2d');
canvasArea.fillStyle = "rgb(0,0,0)"; //board
canvasArea.fillRect(0,0,canvas.width,canvas.height);

var phi; //angle get from user
var r; //radius
var n; //size of flower
var nMax; //get from user
var c; //scaling factor
var flower;
var flowers = [];
var deg2Rad;



canvas.addEventListener("click", function(e) {
  var mouseX = e.offsetX;
  var mouseY = e.offsetY;

  //get from user
  critAngle  = document.getElementById("angle").value;
  nMax       = document.getElementById("size").value;

  c = 10;
  var flower = {
    startX: mouseX,
    startY: mouseY,
    x: 0,
    y: 0,
    phi: 0,
    n: 0,
    red: Math.floor(Math.random()*255 + 1),
    green: Math.floor(Math.random()*255 + 1),
    blue: Math.floor(Math.random()*255 + 1),
    criticalAngle: critAngle,
    maxSize: nMax
  }

  // console.log(mouseX+" "+mouseY+" "+ e.offsetX+" "+e.offsetY);
  flowers.push(flower);
  if(flowers.length==1) {
    setInterval(drawFlower, 1000/25); //refresh 25 fps
  }
});



function drawFlower() {

  for(var i = 0, length = flowers.length; i < length; i++) {

    if(flowers[i].n != flowers[i].maxSize) {
    flowers[i].phi = flowers[i].n * flowers[i].criticalAngle; //formula from paper -- need to change to radians
    deg2Rad = flowers[i].phi * Math.PI / 180;
    flowers[i].r   = c * Math.sqrt(flowers[i].n);
    flowers[i].x   = flowers[i].r * Math.cos( deg2Rad ) + flowers[i].startX;
    flowers[i].y   = flowers[i].r * Math.sin( deg2Rad ) + flowers[i].startY;
    flowers[i].n   = flowers[i].n + 1;


    // canvasArea.fillStyle = "rgb(255,"+ 155 + (flowers[i].n % 100)+",  0)";
    // canvasArea.fillStyle = "rgb("+ flowers[i].r  % 255 +","+ flowers[i].r  % 255 +","+ flowers[i].r  % 255 +")";//change color based on radius
    canvasArea.fillStyle = "rgb(" + (flowers[i].red + flowers[i].n) % 255 + "," + (flowers[i].green + flowers[i].n) % 255 + ","+ (flowers[i].blue + flowers[i].n)%255 +")";
    canvasArea.beginPath(); //ball
    canvasArea.arc(flowers[i].x, flowers[i].y, 7, 0, 2 * Math.PI, false);
    canvasArea.closePath();
    canvasArea.fill();
    }
  }

}
