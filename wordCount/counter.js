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

document.getElementById("submit").addEventListener("click", function() {
	canvas = document.getElementById("game-canvas");
	canvasArea = canvas.getContext('2d');

	textObject = {}; //set to new every time
	textKeys = [];//set to new every time
	bubbles = [] //empty array to store each circle

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
	for(let i = 0; i < 25; i++) {
		var circle = {
			word: textKeys[i],
			count: textObject[textKeys[i]],
			area: Math.floor( textObject[textKeys[i]] / scalingFactor ), //want total surface area to be the count value of the word
			r: function() { return Math.pow( this.area / Math.PI , 1/2); }, //formula to get radius from surface area
			x: ( Math.random()*canvas.width ) + 1, //random x in width
		  y: ( Math.random()*canvas.height ) + 1, //random y in height
			inArray: false
		}

		//check to see if circles are overlapping
		for(let j = 0, length = bubbles.length-1; j < length; j++) { //-1 because we don't want to compare to self.
			protectFromBreak = 500;
			distance = getDistance(circle.x, circle.y, bubbles[j].x, bubbles[j].y);
			while(distance < bubbles[j].r + circle.r && protectFromBreak!=0) { //meaning one inside the other
				protectFromBreak--;
				circle.x = ( Math.random()*canvas.width ) + 1; //try new x
				circle.y = ( Math.random()*canvas.height ) + 1; //try new y
				distance = getDistance(circle.x, circle.y, bubbles[j].x, bubbles[j].y);
			}
		}

		circle.inArray = true;
		bubbles.push(circle); //push into array


		//finally draw circles
		for(let k = 0, length = bubbles.length; k < length; k++) {
			canvasArea.beginPath();
			canvasArea.fillStyle = 'rgba(255, 255, 255, 100)';
			canvasArea.arc(bubbles[k].x, bubbles[k].y, bubbles[k].r(), 0, 2 * Math.PI, false );
			canvasArea.fill();
		}

	}

}

function getScalingFactor(count) { //returns a scale factor based of largest count value
	if(count > 7000) {
		return scalingFactor = 9;
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
	return Math.sqrt( Math.pow( (y2 - y1), 2) + Math.pow( (x2 - x1), 2) ); //distance between two points formula
}
