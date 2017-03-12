var canvasElement = document.createElement('canvas');
canvasElement.width = 900;
canvasElement.height = 900;
canvasElement.id = "game-canvas";
document.getElementById("contentHolder").appendChild(canvasElement);
canvas = document.getElementById("game-canvas");
canvasArea = canvas.getContext('2d');
canvasArea.fillStyle = "rgb(214,214,214)"; //board
canvasArea.fillRect(0,0,canvas.width,canvas.height);

var textBlock; //incoming block on text
var textString; //single string of text
var textObject; //hold word count pairs
var textKeys; //array of only keys
var bubbles; //array for circles
var protectionCount;
var word;
var distance;
var colorChoices;
var scalingFactor;

document.getElementById("submit").addEventListener("click", function() {
	// canvas = document.getElementById("game-canvas");
	// canvasArea = canvas.getContext('2d');

	textObject = {}; //set to new every time
	textKeys = [];//set to new every time
	bubbles = []; //empty array to store each circle
	distance = 0; //find distance between two circles
	colorChoices = [
		"rgb(27,133,184)",
		"rgb(85,158,131)",
		"rgb(174,90,65)",
		"rgb(195,203,113)",
		"rgb(90,82,85)",
		"rgb(150,111,214)"
	]; //possible color choices for circle

	textBlock = document.getElementById("word_blob").value;
	textString = textBlock.replace(/[\n\t?.,*;)("!:]/g, ' ');//replace all new lines, tabs, and specific special characters with space
	textString = textString.replace(/\s\s+/g, ' '); //replace multiple space characters with single space
	textString = textString.split(' '); //split by space

	for(var i = 0, length = textString.length; i < length; i++) {
		word = textString[i].toLowerCase(); //get single word at a time
		if(!/\d+/.test(word) && word !== ""){ //anything that is not a string of digits
			if(textObject[word] === undefined) {
				textObject[word] = 1; //set new key to 1
				textKeys.push(word);
			} else {
				textObject[word] = textObject[word] + 1; //add to the existing key's value by one
			}
		}
	}

	textKeys.sort(compareVal); //Keys now in order of highest value by referencing the key:value pair

	function compareVal(a, b) {
		return textObject[b] - textObject[a];
	}

	scalingFactor = getScalingFactor( 65000 ); //start high. Will reduce with each iteration

	draw();
});

function draw() {

	//repeat until able to place all circles onto canvas
	while( !placeCircles() ){
		scalingFactor = getScalingFactor( scalingFactor ); //reduce scale factor
		bubbles.length = 0; //reset array
		placeCircles();
	}

	//draw canvas
	canvasArea.fillStyle = "rgb(214,214,214)"; //board
	canvasArea.fillRect(0,0,canvas.width,canvas.height);

	//finally draw circles
	for(var k = 0, length = bubbles.length; k < length; k++) {

		canvasArea.beginPath();
		canvasArea.fillStyle = bubbles[k].color;
		canvasArea.arc(bubbles[k].x, bubbles[k].y, bubbles[k].r, 0, 2 * Math.PI, false );
		canvasArea.fill();

		//word
		canvasArea.font="20px Georgia";
		canvasArea.fillStyle = "white";
		canvasArea.fillText(bubbles[k].word, bubbles[k].x-15, bubbles[k].y);

		//count
		canvasArea.font="20px Georgia";
		canvasArea.fillStyle = "white";
		canvasArea.fillText("("+ bubbles[k].count +")", bubbles[k].x-15, bubbles[k].y+20);
	}

}

function getScalingFactor(factor) { //returns a scale factor based of largest count value
	if(factor > 10000){
		factor-=5000;
	} else if(factor >=5000) {
		factor-=1000;
	} else if (factor > 500) {
		factor-=100;
	} else {
		factor-=2;
	}

	return factor;
}

function getDistance( x1, y1, x2, y2) {
	return Math.pow( Math.pow( (y2 - y1), 2) + Math.pow( (x2 - x1), 2), 1/2); //distance between two points formula
}

function placeCircles() {
	bubbles.length = 0; //reset array
	//only interested in top 25 most-used words
	for(var i = 0; i < 25; i++) {

		var circle = {
			word: textKeys[i],
			count: textObject[textKeys[i]],
			area: textObject[textKeys[i]] * scalingFactor , //want total surface area to be the count value of the word
			r: 0,
			x: 0,
			y: 0,
			color: colorChoices[ Math.floor(Math.random()*colorChoices.length) ]
		}
		circle.r = Math.pow( circle.area / Math.PI , 1/2); //formula to get radius from surface area
		circle.x = Math.random()*( canvas.width - 2*circle.r + 1) + circle.r; //random x in (radius -> canvas.width-radius)
		circle.y = Math.random()*( canvas.height - 2*circle.r + 1) + circle.r; //random y in (radius -> canvas.height-radius)

		protectionCount = 100000; //give 10000 chances to place new circles
		restartLoop: //may come back to this to force new cicle to overlap existing
			while(true) { //infinite loop needs to be broken out of
				for(var j = 0, length = bubbles.length; j < length; j++) {
					previous = bubbles[j];
					distance = getDistance(circle.x, circle.y, previous.x, previous.y);

					if( distance < (previous.r+circle.r) && protectionCount!=0) { //meaning one inside the other
							circle.x = Math.random()*( canvas.width - 2*circle.r + 1) + circle.r; //try new x
							circle.y = Math.random()*( canvas.height - 2*circle.r + 1) + circle.r; //try new y
							protectionCount--;
							continue restartLoop; //jump back to top
					}

					if(protectionCount==0) {	//if run out of chances, return to try again.
					 return false; //return false to start whole process again
					}
				}
				break; //break out of while
			}

		bubbles.push(circle); //push into array
	}
	return true;
}
