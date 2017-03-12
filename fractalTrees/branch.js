//branch object
function Branch(begin_x, begin_y, angle, width, depth) {
  this.angle = angle; //in deg
  this.lw    = width - 1; //line width
  this.depth = depth - 1;
  this.drawn = false; //only want to draw branch if not already drawn
  this.hasChildren = false; //does branch have children?kl


  this.begin = { x: begin_x, y: begin_y }; //start x and y
  this.end   = { x: this.begin.x + 0.8 * branch_length.value * this.depth * Math.cos(this.angle * deg2Rad), y: this.begin.y + 0.8 * branch_length.value * this.depth * Math.sin(this.angle * deg2Rad) }; //end x and y


  this.show = function() {
    if(this.depth!=0){
      canvasArea.beginPath();
      canvasArea.moveTo(this.begin.x, this.begin.y); //start of line
      canvasArea.lineTo(this.end.x, this.end.y); //end of line
      canvasArea.lineWidth = this.lw; //thickness of branch
      canvasArea.strokeStyle = "white"; //color
      canvasArea.closePath();
      canvasArea.stroke();
    } else {
      canvasArea.beginPath(); //ball
      canvasArea.fillStyle = "pink";
      canvasArea.arc(this.end.x, this.end.y, 5, 0, 2 * Math.PI, false);
      canvasArea.fill();
    }

  };

  //every branch should create two branches
  this.spawnChildLeft = function() {
    var theta = this.angle - parseInt(left_angle.value);
    var left = new Branch(this.end.x, this.end.y, theta, this.lw, this.depth);
    return left;
  }

  this.spawnChildRight = function() {
    var phi = this.angle + parseInt(right_angle.value);
    var right = new Branch(this.end.x, this.end.y, phi, this.lw, this.depth);
    return right;
  }
}

function resetTree() {
  canvasArea.fillStyle = "rgb(0,0,0)"; //black background
  canvasArea.fillRect(0,0,canvas.width,canvas.height); //redraw board

  tree.length=0; //reset array
  tree.push(new Branch(begin.x, begin.y, -90, 9, 9)); //going to iterate over all branches
  displayTree(); //draw
}

function displayTree() {
  for(var i = 0, length = tree.length; i < length; i++) {
    if(!tree[i].drawn) { //if already drawn then we don't want to draw again
      tree[i].show();
      tree[i].drawn = true;
    }
  }
}