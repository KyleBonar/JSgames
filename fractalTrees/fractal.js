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

function Branch(begin_x, begin_y, end_x, end_y, angle) {
  this.begin = { x: begin_x, y: begin_y }; //start x and y
  this.end = { x: end_x, y: end_y }; //end x and y
  this.angle = angle || 0; //in rad

  this.show = function() {
    canvasArea.beginPath();
    canvasArea.moveTo(this.begin.x, this.begin.y); //start of line
    canvasArea.lineTo(this.end.x, this.end.y); //end of line
    canvasArea.lineWidth = 6; //thickness of branch
    canvasArea.strokeStyle = "white"; //color
    canvasArea.stroke();
  };

  //every branch should create two branches
  this.spawnChildLeft = function() {
    var theta = this.angle + Math.PI / 2;
    var newEndx = this.end.x + 100*Math.cos(theta);
    var newEndy = this.end.y + 100*Math.sin(theta);

    var left = new Branch(this.end.x, this.end.y, newEndx, newEndy, theta);
    return left;
  }

  this.spawnChildRight = function() {
    var phi =  Math.PI / 4;
    // canvasArea.translate(this.end.x, this.end.y);
    var newEndx = this.end.x - 100*Math.cos(phi);
    var newEndy = this.end.y - 100*Math.sin(phi);

    var right = new Branch(this.end.x, this.end.y, newEndx, newEndy, phi);
    return right;
  }

}

branch = new Branch(begin.x, begin.y, end.x, end.y, 0);
tree.push(branch); //going to iterate over all branches
displayTree();

canvas.addEventListener("click", function(e) {

  for(let i = tree.length-1; i >= 0; i--) {
    //tree.push(tree[i].spawnChildLeft());
    tree.push(tree[i].spawnChildRight());
  }

    // tree[1] = branch.spawnChildLeft();
    // tree.push(newBranch);

    // tree[2] = branch.spawnChildRight();
    // tree.push(newBranchAgain);
    displayTree();
});


function displayTree() {
  for(let i = 0, length = tree.length; i < length; i++) {
    tree[i].show();
  }
}
