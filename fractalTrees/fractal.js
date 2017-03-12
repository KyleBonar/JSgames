var canvasElement = document.createElement('canvas');
canvasElement.width = 600;
canvasElement.height = 600;
canvasElement.id = "game-canvas";
document.getElementById("canvasHolder").appendChild(canvasElement);
canvas = document.getElementById("game-canvas");
canvasArea = canvas.getContext('2d');
canvasArea.fillStyle = "rgb(0,0,0)"; //board
canvasArea.fillRect(0,0,canvas.width,canvas.height);

var begin = { x: canvas.width / 2, y: canvas.height}; //start middle bottom
var tree = []; //store all branches
var deg2Rad = Math.PI / 180.0;

var branch_length = document.getElementById("branch_length");//slider
var right_angle = document.getElementById("right_angle");//slider
var left_angle = document.getElementById("left_angle");//slider

var branch_length_val = document.getElementById("branch_length_val");//span
var right_angle_val = document.getElementById("right_angle_val");//span
var left_angle_val = document.getElementById("left_angle_val");//span

branch_length_val.innerHTML = branch_length.value
right_angle_val.innerHTML = right_angle.value
left_angle_val.innerHTML = left_angle.value

tree.push(new Branch(begin.x, begin.y, -90, 9, 9)); //going to iterate over all branches
displayTree();

//section for event listeners
document.getElementById("reset_tree").addEventListener("click", resetTree);

branch_length.addEventListener("change", function(){
  branch_length_val.innerHTML = this.value;
});

right_angle.addEventListener("change", function(){
  right_angle_val.innerHTML = this.value;
});

left_angle.addEventListener("change", function(){
  left_angle_val.innerHTML = this.value;
});

canvas.addEventListener("click", function(e) {
  for(var i = tree.length-1; i >= 0; i--) {
    if(!tree[i].hasChildren && tree[i].depth!=0) {
      tree.push(tree[i].spawnChildLeft()); //spawn left and push into array
      tree.push(tree[i].spawnChildRight()); //spawn right and push into array
      tree[i].hasChildren = true; //now branch has children
    }
  }
  displayTree();
});

