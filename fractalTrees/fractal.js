var canvasElement = document.createElement('canvas');
canvasElement.width = 600;
canvasElement.height = 700;
canvasElement.id = "game-canvas";
document.getElementById("contentHolder").appendChild(canvasElement);
canvas = document.getElementById("game-canvas");
canvasArea = canvas.getContext('2d');
canvasArea.fillStyle = "rgb(0,0,0)"; //board
canvasArea.fillRect(0,0,canvas.width,canvas.height);

var begin = { x: canvas.width / 2, y: canvas.height};
var end = { x: canvas.width/2, y: canvas.height - 100};
var angle = 0;
var tree = []; //store all branches
var deg2Rad = Math.PI / 180.0;
var tree_size = document.getElementById("tree_size");
var depth = document.getElementById("branch_depth");
var right_angle = document.getElementById("right_angle");
var left_angle = document.getElementById("left_angle");

function Branch(begin_x, begin_y, angle, width, depth) {
  this.angle = angle; //in deg
  this.lw    = width - 1; //line width
  this.depth = depth - 1;
  this.drawn = false; //only want to draw branch if not already drawn
  this.hasChildren = false; //does branch have children?


  this.begin = { x: begin_x, y: begin_y }; //start x and y
  this.end   = { x: this.begin.x + 5 * this.depth * Math.cos(this.angle * deg2Rad), y: this.begin.y + 5 * this.depth * Math.sin(this.angle * deg2Rad) }; //end x and y


  this.show = function() {
    canvasArea.beginPath();
    canvasArea.moveTo(this.begin.x, this.begin.y); //start of line
    canvasArea.lineTo(this.end.x, this.end.y); //end of line
    canvasArea.lineWidth = this.lw; //thickness of branch
    canvasArea.strokeStyle = "white"; //color
    canvasArea.closePath();
    canvasArea.stroke();
  };

  //every branch should create two branches
  this.spawnChildLeft = function() {
    var theta = this.angle - left_angle.value;
    var left = new Branch(this.end.x, this.end.y, theta, this.lw, this.depth);
    return left;
  }

  this.spawnChildRight = function() {
    var phi = this.angle + right_angle.value;
    var right = new Branch(this.end.x, this.end.y, phi, this.lw, this.depth);
    return right;
  }

}

tree.push(new Branch(begin.x, begin.y, -90, depth.value, depth.value)); //going to iterate over all branches
displayTree();

document.getElementById("reset_tree").addEventListener("click", resetTree);
depth.addEventListener("change", function(){
  document.getElementById("branch_depth_val").innerHTML = this.value;
});
right_angle.addEventListener("change", function(){
  document.getElementById("right_angle_val").innerHTML = this.value;
});
canvas.addEventListener("click", function(e) {
  for(let i = tree.length-1; i >= 0; i--) {
    if(!tree[i].hasChildren && tree[i].depth!=0) {
      tree.push(tree[i].spawnChildLeft()); //spawn left and push into array
      tree.push(tree[i].spawnChildRight()); //spawn right and push into array
      tree[i].hasChildren = true; //now branch has children
    }
  }
  displayTree();
});



function resetTree() {
  canvasArea.fillStyle = "rgb(0,0,0)"; //black background
  canvasArea.fillRect(0,0,canvas.width,canvas.height); //redraw board

  tree.length=0; //reset array
  tree.push(new Branch(begin.x, begin.y, -90, depth.value, depth.value)); //going to iterate over all branches
  displayTree(); //draw
}

function displayTree() {
  for(let i = 0, length = tree.length; i < length; i++) {
    if(!tree[i].drawn) { //if already drawn then we don't want to draw again
      tree[i].show();
      tree[i].drawn = true;
    }
  }
}
