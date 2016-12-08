var canvasElement = document.createElement('canvas');
canvasElement.width = 920;
canvasElement.height = 900;
canvasElement.id = "game-canvas";
document.body.appendChild(canvasElement);

var textBlock; //incoming block on text
var textString; //single string of text
var textObject; //hold word count pairs
var textKeys; //array of only keys
var bubbles; //array for circles
var protectFromBreak;
var word;
var distance;

document.getElementById("submit").addEventListener("click", function() {
	canvas = document.getElementById("game-canvas");
	canvasArea = canvas.getContext('2d');

	textObject = {}; //set to new every time
	textKeys = [];//set to new every time
	bubbles = [] //empty array to store each circle
	distance = 0; //find distance between two circles

	textBlock = document.getElementById("word_blob").value;
	textString = textBlock.replace(/[\n\t?.,*;)("!:]/g, ' ');//replace all new lines, tabs, and specific special characters with space
	textString = textString.replace(/\s\s+/g, ' '); //replace multiple space characters with single space
	textString = textString.split(' '); //split by space

	for(let i = 0, length = textString.length; i < length; i++) {
		word = textString[i].toLowerCase(); //get single word at a time
		if(!/\d+/.test(word)){ //anything that is not a string of digits
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

	draw();
});

function draw() {
	canvasArea.fillStyle = "black"; //board
	canvasArea.fillRect(0,0,canvas.width,canvas.height);

	var scalingFactor = getScalingFactor( textObject[textKeys[0]] );

	//only interested in top 25 most-used words
	for(let i = 0; i < 10; i++) {
		var circle = {
			word: textKeys[i],
			count: textObject[textKeys[i]],
			area: Math.floor( textObject[textKeys[i]] / scalingFactor ), //want total surface area to be the count value of the word
			r: 0,
			x: 0,
		  y: 0
		}
		circle.r = Math.pow( circle.area / Math.PI , 1/2); //formula to get radius from surface area
		circle.x = Math.random()*( canvas.width - 2*circle.r + 1) + circle.r; //random x in width
		circle.y = Math.random()*( canvas.height - 2*circle.r + 1) + circle.r; //random y in height

		restartLoop: //may come back to this to force cicles not to overlap
		while(true){ //infinite loop on purpose
			for(let j = 0, length = bubbles.length; j < length; j++) {
				previous = bubbles[j];
				distance = getDistance(circle.x, circle.y, previous.x, previous.y);

				if( distance < (previous.r+circle.r) ) { //meaning one inside the other
						circle.x = Math.random()*( canvas.width - 2*circle.r + 1) + circle.r; //try new x
						circle.y = Math.random()*( canvas.height - 2*circle.r + 1) + circle.r; //try new y
						continue restartLoop; //jump back to top
				}
			}
			break; //break out of while
		}



		console.log(circle.word+" "+circle.x+" "+circle.y);
		bubbles.push(circle); //push into array

	}
	//finally draw circles
	for(let k = 0, length = bubbles.length; k < length; k++) {
		canvasArea.beginPath();
		canvasArea.fillStyle = 'rgba(255, 255, 255, 100)';
		canvasArea.arc(bubbles[k].x, bubbles[k].y, bubbles[k].r, 0, 2 * Math.PI, false );
		canvasArea.fill();

		canvasArea.font="20px Georgia";
		canvasArea.fillStyle = "blue";
		canvasArea.fillText(bubbles[k].word, bubbles[k].x, bubbles[k].y);
	}

}

function getScalingFactor(count) { //returns a scale factor based of largest count value
	if(count > 7000) {
		return scalingFactor = 1/8;
	} else if (count > 6000) {
		return scalingFactor = 8;
	} else if (count > 5000) {
		return scalingFactor = 7;
	} else if (count > 4000) {
		return scalingFactor = 6;
	} else if (count > 3000) {
		return scalingFactor = 5;
	} else if (count > 2000) {
		return scalingFactor = 4;
	} else if (count > 1000) {
		return scalingFactor = 3;
	} else if (count > 500) {
		return scalingFactor = 2;
	} else if (count > 250) {
		return scalingFactor = 1;
	} else if (count > 100) {
		return scalingFactor = 1 / 2;
	} else {
		return scalingFactor = 1 / 4;
	}
}

function getDistance( x1, y1, x2, y2) {
	return Math.pow( Math.pow( (y2 - y1), 2) + Math.pow( (x2 - x1), 2), 1/2); //distance between two points formula
	// return Math.sqrt( Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2) );
}
