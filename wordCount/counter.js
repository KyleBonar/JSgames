var canvasElement = document.createElement('canvas');
canvasElement.width = 600;
canvasElement.height = 600;
canvasElement.id = "game-canvas";
document.body.appendChild(canvasElement);

var textBlock;
var textString;
var textArray = [];
var word;

document.getElementById("submit").addEventListener("click", function() {
	canvas = document.getElementById("game-canvas");
	gameContext = canvas.getContext('2d');

	textBlock = document.getElementById("word_blob").value;
	draw(textBlock);
});

function draw(textBlock) {
	textString = textBlock.replace(/[\n\t?.,*;)("!:]/g, ' ');//replace all new lines, tabs, and specific special characters with space
	textString = textString.replace(/\s\s+/g, ' '); //replace multiple space characters with single space
	textString = textString.split(' '); //split by space

	for(let i = 0, length = textString.length; i < length; i++) {
		word = textString[i].toLowerCase(); //get single word at a time
		if(textArray[word] === undefined) {
			textArray[word] = 1; //set new key to 1
		} else {
			textArray[word] = textArray[word] + 1; //add to the existing key's value by one
		}
	}


	gameContext.fillStyle = "black"; //board
	gameContext.fillRect(0,0,canvas.width,canvas.height);
}