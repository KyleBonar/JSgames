var canvas = document.createElement('canvas');
canvas.width = 600;
canvas.height = 600;
canvas.style.display = "inline"; //make block
canvas.style.margin = "0 auto"; //center block on screen
canvas.id = "game-canvas";
document.getElementById('canvasHolder').appendChild(canvas);
canvasContext = document.getElementById("game-canvas").getContext('2d');
canvasContext.fillStyle = "black"; //board
canvasContext.fillRect(0, 0, canvas.width, canvas.height);


//constants
  var d2Theta1  = 0; //no initial force on first circle
  var d2Theta2  = 0; //no initial force on second circle
  var dTheta1   = 0; //no initial velocity on first circle
  var dTheta2   = 0; //no initial velocity on second circle
  var theta1    = Math.PI / 2; //initial angle
  var theta2    = Math.PI / 2.5;  //initial angle
  var x0        = canvas.width / 2; //center
  var y0        = canvas.height / 2; //center
  var scaling   = 0.05; //scaling factor

//set interval over
  var init;

//objects
  var line1, line2, circle1, circle2;

//sliders
  var l1_slider = document.getElementById("string1_length");
  var l2_slider = document.getElementById("string2_length");
  var m1_slider = document.getElementById("ball1_mass");
  var m2_slider = document.getElementById("ball2_mass");
  var g_slider  = document.getElementById("gravity");

//spans
  var l1_span = document.getElementById("string1_length_val");
  var l2_span = document.getElementById("string2_length_val");
  var m1_span = document.getElementById("ball1_mass_val");
  var m2_span = document.getElementById("ball2_mass_val");
  var g_span  = document.getElementById("gravity_val");

//set span values
  l1_span.innerHTML = l1_slider.value;
  l2_span.innerHTML = l2_slider.value;
  m1_span.innerHTML = m1_slider.value;
  m2_span.innerHTML = m2_slider.value;
  g_span.innerHTML = g_slider.value;

//buttons
  var buttonReset = document.getElementById("reset_pend");
  var buttonGo    = document.getElementById("go_pend");

//event listeners
  l1_slider.addEventListener("change", function() {
    l1_span.innerHTML = this.value;
  });
  l2_slider.addEventListener("change", function() {
    l2_span.innerHTML = this.value;
  });
  m1_slider.addEventListener("change", function() {
    m1_span.innerHTML = this.value;
  });
  m2_slider.addEventListener("change", function() {
    m2_span.innerHTML = this.value;
  });
  g_slider.addEventListener("change", function() {
    g_span.innerHTML = this.value;
  });

  buttonReset.addEventListener("click", placePendulum);
  buttonGo.addEventListener("click",function() {
    clearInterval(init);
    init = setInterval(function(){
      update();
    }, 10);
  });

//function to draw the circle depending on the object values
function drawMass(circle) {
  canvasContext.beginPath();
  canvasContext.arc(circle.x, circle.y, circle.mass, 0, 2 * Math.PI);
  canvasContext.fillStyle = '#fff';
  canvasContext.fill();
  canvasContext.lineWidth = 10;
  canvasContext.strokeStyle = 'red';
  canvasContext.stroke();
}

//function to draw the string based on string object values
function drawString(line) {
  canvasContext.beginPath();
  canvasContext.moveTo(line.x0, line.y0);
  canvasContext.lineTo(line.x , line.y );
  canvasContext.lineWidth = 3;
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
    canvasContext.fillStyle = "black"; //board color
    canvasContext.fillRect(0, 0, canvas.width, canvas.height); //board
    drawString(line1); //center to circle 1
    drawString(line2); //circle1 to circle 2
    drawMass(circle1); //circle 1
    drawMass(circle2); //circle 2
}

function placePendulum() {
  clearInterval(init); //stop interval

  //get value from sliders
    l1 = parseInt(l1_slider.value);
    l2 = parseInt(l2_slider.value);
    m1 = parseInt(m1_slider.value);
    m2 = parseInt(m2_slider.value);
    g  = parseInt(g_slider.value);

  //reset initial values
    d2Theta1  = 0; //no initial force on first circle
    d2Theta2  = 0; //no initial force on second circle
    dTheta1   = 0; //no initial velocity on first circle
    dTheta2   = 0; //no initial velocity on second circle
    theta1 = Math.PI / 2; //initial angle
    theta2 = Math.PI / 2.5; //initial angle

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
  //lines
    line1 = {x0: x0, y0: y0, x: circle1.x, y: circle1.y}; //line object from center to first circle
    line2 = {x0: circle1.x, y0: circle1.y, x: circle2.x, y: circle2.y}; //line object from first circle to second

  //draw
    canvasContext.fillStyle = "black"; //board color
    canvasContext.fillRect(0, 0, canvas.width, canvas.height); //board
    drawString(line1); //center to circle 1
    drawString(line2); //circle1 to circle 2
    drawMass(circle1); //circle 1
    drawMass(circle2); //circle 2
}

//start with pendulum on screen
window.onload = placePendulum();
