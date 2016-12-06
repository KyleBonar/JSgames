var canvasElement = document.createElement('canvas');
canvasElement.width = 920;
canvasElement.height = 900;
canvasElement.id = "game-canvas";
document.body.appendChild(canvasElement);

var textBlock; //incoming block on text
var textString; //single string of text
var textArray = {}; //hold word count pairs
var textKeys = []; //array of only keys
var word;

document.getElementById("submit").addEventListener("click", function() {
	canvas = document.getElementById("game-canvas");
	canvasArea = canvas.getContext('2d');

	textArray = {}; //set to new every time
	textKeys = [];//set to new every time

	textBlock = document.getElementById("word_blob").value;
	draw(textBlock);
});

function draw(textBlock) {
	textString = textBlock.replace(/[\n\t?.,*;)("!:]/g, ' ');//replace all new lines, tabs, and specific special characters with space
	textString = textString.replace(/\s\s+/g, ' '); //replace multiple space characters with single space
	textString = textString.split(' '); //split by space

	for(let i = 0, length = textString.length; i < length; i++) {
		word = textString[i].toLowerCase(); //get single word at a time
		if(!/\d+/.test(word)){ //anything that is not a string of digits
			if(textArray[word] === undefined) {
				textArray[word] = 1; //set new key to 1
				textKeys.push(word);
			} else {
				textArray[word] = textArray[word] + 1; //add to the existing key's value by one
			}
		}
	}

	textKeys.sort(compareVal); //Keys now in order of highest value by referencing the key:value pair

	function compareVal(a, b) {
		return textArray[b] - textArray[a];
	}

	canvasArea.fillStyle = "black"; //board
	canvasArea.fillRect(0,0,canvas.width,canvas.height);

	//master scaling ratio applied to all bubbles to match appropriate size to word count
	//biggest bubble will be 20% (can change later)
	// var ratio = (canvasElement.width * canvasElement.height * 0.2) / (2 * Math.PI ) / ;

	var scalingFactor;
	if(textArray[textKeys[i]] > 6000) {

	}
	var scalingFactor = textArray[textKeys[i]] >
	//only interested in top n most-used words
	for(let i = 0; i < 50; i++) {

		var surfaceArea = textArray[textKeys[i]]; //want total surface area to be the count value of the word
		// var ball_r = ratio * textArray[textKey[i]]; //biggest
		var ball_r = surfaceArea / (20 * Math.PI); //formula to get radius from surface area
		var ball_x = ( Math.random()*canvas.width ) + 1;
		var ball_y = ( Math.random()*canvas.height ) + 1

		//make bubble
		canvasArea.beginPath();
		canvasArea.fillStyle = "white";
		canvasArea.arc(ball_x, ball_y, ball_r, 0, 2 * Math.PI, false );
		canvasArea.fill();

		//place word inside bubble
		// canvasArea.font = "30px Arial";
		// canvasArea.fillText(textArray[word], ball_x, ball_y);

	}


}
