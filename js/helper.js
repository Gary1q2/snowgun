// Preview next level
function nextLevel() {
	if (game.level < levels.length-1) {
		game.level++;
		document.getElementById("levelName").innerHTML = levelNames[game.level];
		playSound(snowbreak_snd);
	}
	console.log(game.level);
}

// Preview previous level
function prevLevel() {
	if (game.level > 0) {
		game.level--;
		document.getElementById("levelName").innerHTML = levelNames[game.level];
		playSound(snowbreak_snd);
	}
	console.log(game.level);
}

function changeImage(curr, img) {
	curr.src = img.src;
}

function stretchImage(img) {
	img.style.width = img.width-10; 
	console.log(img.style.left);
}

function unstretchImage(img) {
	img.style.width = img.width+10;
}

// Clones audio node and plays the sound
function playSound(audioNode) {
	var clone = audioNode.cloneNode(true);
	clone.play();
}


// Checks if two rectangles have a collision (true or false)
function testCollisionRectRect(rect1, rect2) {
	return rect1.x < rect2.x + rect2.width 
		&& rect2.x < rect1.x + rect1.width
		&& rect1.y < rect2.y + rect2.height
		&& rect2.y < rect1.y + rect1.height;
}

// Draw grids
function drawGrids() {
	ctx.globalAlpha = 0.4;

	// Draw horizontal lines
	for (var i = 0; i < canvas.height/gridLen; i++) {
		ctx.beginPath();
		ctx.moveTo(0, i*gridLen+0.5);
		ctx.lineTo(canvas.width, i*gridLen+0.5);

		ctx.moveTo(0, i*gridLen+gridLen-0.5);
		ctx.lineTo(canvas.width, i*gridLen+gridLen-0.5);

		ctx.stroke();
	}

	// Draw vertical lines
	for (var i = 0; i < canvas.width/gridLen; i++) {
		ctx.beginPath();
		ctx.moveTo(i*gridLen+0.5, 0);
		ctx.lineTo(i*gridLen+0.5, canvas.height);

		ctx.moveTo(i*gridLen+gridLen-0.5, 0);
		ctx.lineTo(i*gridLen+gridLen-0.5, canvas.height);

		ctx.stroke();
	}

	ctx.globalAlpha = 1;
}

// Return the player object given their ID
// Otherwise return FALSE
function getPlayer(playerID) {
	for (var i of playerArr) {
		if (playerID == i.playerID) {
			return i;
		}
	}
	return false;
}