var canvas = document.createElement('canvas');
canvas.width = 600;
canvas.height = 600;
canvas.style.display = "block"; //make block
canvas.style.margin = "0 auto"; //center block on screen
canvas.id = "game-canvas";
document.getElementById('contentHolder').appendChild(canvas);
canvasContext = document.getElementById("game-canvas").getContext('2d');
canvasContext.fillStyle = "black"; //board
canvasContext.fillRect(0, 0, canvas.width, canvas.height);


//constants
var d2Theta1 = 0; //no intial force on first circle
var d2Theta2 = 0; //no initial force on second circle
var dTheta1  = 0; //no intial velocity on first circle
var dTheta2  = 0; //no intial velocity on second circle
var theta1   = Math.PI / 2;
var theta2   = Math.PI / 2;
var x0     = canvas.width / 2;
var y0     = canvas.height / 2;
var l1 = l2 = m1 = m2 = 0;
var g      = 9.8;
var scaling = 0.05;
var line1, line2, circle1, circle2, init;

var button = document.getElementById("reset_pend");
button.addEventListener("click", function() {

  l1 = parseInt(document.getElementById("string1_length").value);
  l2 = parseInt(document.getElementById("string2_length").value);
  m1 = parseInt(document.getElementById("ball1_mass").value);
  m2 = parseInt(document.getElementById("ball2_mass").value);

  line1 = {x0: x0, y0: y0, x: 0, y: 0}; //line object from center to first circle -- default values quickly get replaced
  line2 = {x0: 0, y0: 0, x: 0, y: 0}; //line object from first circle to second --default values quickly get replaced
  //first circle
  circle1 = {
    x: x0 + l1 * Math.sin(theta1),
    y: y0 + l1 * Math.cos(theta1),
    mass: m1
  };
  //second circle
  circle2 = {
    x: x0 + l1 * Math.sin(theta1) + l2 * Math.sin(theta2),
    y: y0 + l1 * Math.cos(theta1) + l2 * Math.cos(theta2),
    mass: m2
  };

  clearInterval(init);
  init = setInterval(function(){
    update();
  }, 7);
});

//function to draw the circle depending on where the object is
function drawMass(circle) {
  canvasContext.beginPath();
  canvasContext.arc(circle.x, circle.y, circle.mass, 0, 2 * Math.PI);
  canvasContext.fillStyle = '#fff';
  canvasContext.fill();
  canvasContext.lineWidth = 10;
  canvasContext.strokeStyle = 'red';
  canvasContext.stroke();
}

//function to draw the string based on where string object is
function drawString(line) {
  canvasContext.beginPath();
  canvasContext.moveTo(line.x0, line.y0);
  canvasContext.lineTo(line.x , line.y );
  canvasContext.strokeStyle = 'yellow';
  canvasContext.stroke();
}

function update() {
  //formulas from http://sophia.dtp.fmph.uniba.sk/~kovacik/doublePendulum.pdf slide 13
  d2Theta1 = 0.95 * (-m2 * l1 * dTheta1 * dTheta1 * Math.sin(theta1 - theta2) * Math.cos(theta1 - theta2) + g * m2 * Math.sin(theta2) * Math.cos(theta1 - theta2) - m2 * l2 * dTheta2 * dTheta2 * Math.sin(theta1 - theta2) - (m1 + m2) * g * Math.sin(theta1) ) / (l1 * (m1 + m2) - m2 * l1 * Math.cos(theta1 - theta2) * Math.cos(theta1 - theta2) );
  d2Theta2 = 0.95 * ( m2 * l2 * dTheta2 * dTheta2 * Math.sin(theta1 - theta2) * Math.cos(theta1 - theta2) + g * Math.sin(theta1) * Math.cos(theta1 - theta2) * (m1 + m2) + l1 * dTheta1 * dTheta1 * Math.sin(theta1 - theta2) * (m1 + m2) - g * Math.sin(theta2) * (m1 + m2)) / (l2 * (m1 + m2) - m2 * l2 * Math.cos(theta1 - theta2) * Math.cos(theta1 - theta2));

  dTheta1 += d2Theta1 * scaling;
  dTheta2 += d2Theta2 * scaling;

  theta1 += dTheta1 * scaling;
  theta2 += dTheta2 * scaling;

  //update circles
  circle1.x = x0 + l1 * Math.sin(theta1);
  circle1.y = y0 + l1 * Math.cos(theta1);
  circle2.x = x0 + l1 * Math.sin(theta1) + l2 * Math.sin(theta2);
  circle2.y = y0 + l1 * Math.cos(theta1) + l2 * Math.cos(theta2);

  //update lines
  //dont need to set line1.x0 and line1.y0 because at fixed position
  line1.x  = circle1.x;
  line1.y  = circle1.y;
  line2.x0 = circle1.x;
  line2.y0 = circle1.y;
  line2.x  = circle2.x;
  line2.y  = circle2.y;

  //draw
  canvasContext.fillStyle = "black"; //board
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);

  drawString(line1); //center to circle 1
  drawString(line2); //circle1 to circle 2
  drawMass(circle1); //circle 1

  drawMass(circle2); //circle 2
}
