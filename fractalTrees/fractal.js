var canvasElement = document.createElement('canvas');
canvasElement.width = 600;
canvasElement.height = 600;
canvasElement.id = "game-canvas";
document.getElementById("contentHolder").appendChild(canvasElement);
canvas = document.getElementById("game-canvas");
canvasArea = canvas.getContext('2d');
canvasArea.fillStyle = "rgb(0,0,0)"; //board
canvasArea.fillRect(0,0,canvas.width,canvas.height);

var begin = { x: canvas.width / 2, y: canvas.height};
var end = { x: canvas.width/2, y: canvas.height - 100};
var angle = 0;
var branch;
var tree = []; //store all branches
var deg2Rad = Math.PI / 180.0;

function Branch(begin_x, begin_y, end_x, end_y, angle, width, depth) {
  this.begin = { x: begin_x, y: begin_y }; //start x and y
  this.end   = { x: end_x, y: end_y }; //end x and y
  this.angle = angle; //in deg
  this.lw    = width - 1; //line width
  this.depth = depth - 1;

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
    var theta = this.angle - 20;
    var x2 = this.end.x + 15 * this.depth * Math.cos(theta * deg2Rad);
    var y2 = this.end.y + 15 * this.depth * Math.sin(theta * deg2Rad);

    var left = new Branch(this.end.x, this.end.y, x2, y2, theta, this.lw, this.depth);
    return left;
  }

  this.spawnChildRight = function() {
    var phi = this.angle + 20;
    var x2 = this.end.x + 15 * this.depth * Math.cos(phi * deg2Rad);
    var y2 = this.end.y + 15 * this.depth * Math.sin(phi * deg2Rad);

    var right = new Branch(this.end.x, this.end.y, x2, y2, phi, this.lw, this.depth);
    return right;
  }

}

branch = new Branch(begin.x, begin.y, end.x, end.y, -90, 8, 5);
tree.push(branch); //going to iterate over all branches
displayTree();

canvas.addEventListener("click", function(e) {
  for(let i = tree.length-1; i >= 0; i--) {
    tree.push(tree[i].spawnChildLeft());
    tree.push(tree[i].spawnChildRight());
  }
    displayTree();
});


function displayTree() {
  for(let i = 0, length = tree.length; i < length; i++) {
    tree[i].show();
  }
}
