class Entity {
	constructor(x, y, width, height, img, nRow, nCol, frameSeq, centerX, centerY) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.img = img;

		this.nRow = nRow;
		this.nCol = nCol;
		this.frameSeq = frameSeq;

		this.centerX = centerX;
		this.centerY = centerY;

		this.angle = DIR.right;

		this.animIndex = 0;
		this.animCurrFrame = 0;
		this.animDelay = 0;
		this.animDelayTime = 4;
		this.finishAnim = false;

		this.colShiftX = 0;
		this.colShiftY = 0;
	}
	update() {
		this.drawAnimated(this.frameSeq); 
	}

 	drawAnimated(array) {
		this.finishAnim = false;
		this.animCurrFrame = array[this.animIndex];

		var xPos = (this.animCurrFrame % this.nCol) * this.img.width/this.nCol;
		var yPos = Math.floor(this.animCurrFrame / this.nCol) * this.img.height/this.nRow;
	
		// Draw animation depending on angle
		if (this.angle == DIR.right) {
			ctx.translate(this.x, this.y);
		} else if (this.angle == DIR.up) {
			ctx.translate(this.x, this.y);
			ctx.rotate(-90*Math.PI/180);
			ctx.translate(-this.img.width/this.nCol, 0);
		} else if (this.angle == DIR.left) {
			ctx.translate(this.x+this.img.width/this.nCol, this.y);
			ctx.scale(-1, 1);
		} else if (this.angle == DIR.down) {
			ctx.translate(this.x, this.y);
			ctx.rotate(90*Math.PI/180);
			ctx.translate(0, -this.img.width/this.nCol);		
		}
		ctx.drawImage(this.img, xPos, yPos, this.img.width/this.nCol, this.img.height/this.nRow, -this.centerX, -this.centerY,
					  this.img.width/this.nCol, this.img.height/this.nRow);
		ctx.setTransform(1, 0, 0, 1, 0, 0);

		if (this.animDelay <= this.animDelayTime) {
			this.animDelay++;
		} else {
			this.animDelay = 0;
			this.animIndex++;
			if (this.animIndex >= array.length) {
				this.animIndex = 0;
				this.finishAnim = true;
			}
		}
	}

	// Draw collision box for sprite
	drawCol() {
		var x_anchor = this.x-this.centerX+this.colShiftX;
		var y_anchor = this.y-this.centerY+this.colShiftY;

		ctx.beginPath();

		x_anchor += this.img.width/this.nCol/2-this.width/2;
	    y_anchor += this.img.height/this.nRow/2-this.height/2;

		// Left vertical
		ctx.moveTo(x_anchor+0.5, y_anchor);
		ctx.lineTo(x_anchor+0.5, y_anchor+this.height);

		// Right vertical
		ctx.moveTo(x_anchor+this.width-0.5, y_anchor);
		ctx.lineTo(x_anchor+this.width-0.5, y_anchor+this.height);

		// Top horizontal
		ctx.moveTo(x_anchor, y_anchor+0.5);
		ctx.lineTo(x_anchor+this.width, y_anchor+0.5);

		// Bottom horizontal
		ctx.moveTo(x_anchor, y_anchor+this.height-0.5);
		ctx.lineTo(x_anchor+this.width, y_anchor+this.height-0.5);

		ctx.stroke();
	}


	// Check collision with another object
	collideWith(other) {
		var rect1 = {
			x: this.x-this.centerX+this.colShiftX+this.img.width/this.nCol/2-this.width/2,
			y: this.y-this.centerY+this.colShiftY+this.img.height/this.nRow/2-this.height/2,
			width: this.width,
			height: this.height
		};

		var rect2 = {
			x: other.x-other.centerX+other.colShiftX+other.img.width/other.nCol/2-other.width/2,
			y: other.y-other.centerY+other.colShiftY+other.img.height/other.nRow/2-other.height/2,
			width: other.width,
			height: other.height
		};

		return testCollisionRectRect(rect1, rect2);
	}


	// Check collision with another object @ certain offset
	collideWithAt(other, xOff, yOff) {
		var rect1 = {
			x: this.x-this.centerX+this.colShiftX+this.img.width/this.nCol/2-this.width/2 + xOff,
			y: this.y-this.centerY+this.colShiftY+this.img.height/this.nRow/2-this.height/2 + yOff,
			width: this.width,
			height: this.height
		};
		var rect2 = {
			x: other.x-other.centerX+other.colShiftX+other.img.width/other.nCol/2-other.width/2,
			y: other.y-other.centerY+other.colShiftY+other.img.height/other.nRow/2-other.height/2,
			width: other.width,
			height: other.height
		};
		return testCollisionRectRect(rect1, rect2);
	}

	// Get the object's rectangle at a certain (x,y)
	getRectAt(xNew, yNew) {
		var rect = {
			x: xNew-this.centerX+this.colShiftX+this.img.width/this.nCol/2-this.width/2,
			y: yNew-this.centerY+this.colShiftY+this.img.height/this.nRow/2-this.height/2,
			width: this.width,
			height: this.height
		};
		return rect;
	}

	// Check collision with wall objects
	checkWallCol() {
		for (var i = 0; i < wallArr.array.length; i++) {
			if (!wallArr.array[i].dead) {
				if (this.collideWith(wallArr.array[i])) {
					return wallArr.array[i];
				}
			}
		}
		return false;
	}

	// Check collision with wall objects at offset
	checkWallColAt(xOff, yOff) {
		for (var i = 0; i < wallArr.array.length; i++) {
			if (!wallArr.array[i].dead) {
				if (this.collideWithAt(wallArr.array[i], xOff, yOff)) {
					return wallArr.array[i];
				}
			}
		}
		return false;
	}


	// Check collision with the edge
	checkEdgeCol() {
		var leftX = this.x-this.centerX+this.colShiftX+this.img.width/this.nCol/2-this.width/2;
		var topY = this.y-this.centerY+this.colShiftY+this.img.height/this.nRow/2-this.height/2;
		var rightX = leftX + this.width;
		var bottomY = topY + this.height;

		// Check if any edge is outside the room
		if (leftX < 0 || topY < 0 || rightX > numWidth*gridLen || bottomY > numHeight*gridLen) {
			return true;
		} else {
			return false;
		}
	}

	// Check collision with edge at offset
	checkEdgeColAt(xOff, yOff) {
		var leftX = this.x-this.centerX+this.colShiftX+this.img.width/this.nCol/2-this.width/2 + xOff;
		var topY = this.y-this.centerY+this.colShiftY+this.img.height/this.nRow/2-this.height/2 + yOff;
		var rightX = leftX + this.width;
		var bottomY = topY + this.height;

		// Check if any edge is outside the room
		if (leftX < 0 || topY < 0 || rightX > numWidth*gridLen || bottomY > numHeight*gridLen) {
			return true;
		} else {
			return false;
		}
	}


	setAngle(angle) {
		this.angle = angle;
	}

	// Change current sprite to another
	changeSprite(img, width, height, nRow, nCol, frameSeq, centerX, centerY) {
		this.img = img;
		this.width = width;
		this.height = height;
		this.nRow = nRow;
		this.nCol = nCol
		this.frameSeq = frameSeq;
		this.centerX = centerX;
		this.centerY = centerY;
	}
}




class Smoke extends Entity {
	constructor(x, y, dir) {
		super(x, y, 20, 20, smoke_img, 3, 3, [0,1,2,3,4,5], 0, 0);
		this.animDelayTime = 8;
		this.dead = false;

		this.vspeed = 0.5;
		this.hspeed = 0.5;
		if (Math.random() > 0.5) {
			this.vspeed = -this.vspeed;
		}
		if (Math.random() > 0.5) {
			this.hspeed = -this.hspeed;
		}

		this.friction = 0.05;
	}
	update() {
		this.updateMovement();
		this.draw();
	}
	updateMovement() {
		if (this.vspeed > 0) {
			this.vspeed -= this.friction;
		} else if (this.vspeed < 0) {
			this.vspeed += this.friction;
		}
		if (this.hspeed > 0) {
			this.hspeed -= this.friction;
		} else if (this.hspeed < 0) {
			this.hspeed += this.friction;
		}
		this.x += this.hspeed;
		this.y += this.vspeed;
	}
	draw() {
		this.drawAnimated(this.frameSeq);
		if (this.finishAnim) {
			this.dead = true;
		}

		if (debug) {
			this.drawCol();
		}
	}
}

class Shell extends Entity {
	constructor(x, y, img, dir) {
		super(x, y, 4, 3, img, 1, 1, [0], 0,0);
		this.dead = false;

		this.dir = dir;
		this.stopTime = 30+Math.random()*10;
		this.deadTime = 200;

		this.vspeed = -1;
		this.hspeed = 1.5+Math.random();

		// Set direction of shell (if left or right otherwise random)
		if (this.dir == DIR.up || this.dir == DIR.down) {
			if (Math.random() > 0.5) {
				this.hspeed = -this.hspeed;
			}
		} else {
			if (this.dir == DIR.left) {
				this.hspeed = this.hspeed;
			} else {
				this.hspeed = -this.hspeed;
			}
		}
		this.fallSpeed = 1;
		this.friction = 0.1
	}

	update() {
		this.updateMovement();
		this.draw();

		if (this.stopTime > 0) {
			this.stopTime--;
		}
		if (this.deadTime > 0) {
			this.deadTime--;
			if (this.deadTime == 0) {
				this.dead = true;
			}
		}

		if (debug) {
			this.drawCol();
		}
	}
	updateMovement() {
		if (this.stopTime > 0) {

			if (this.vspeed < this.fallSpeed) {
				this.vspeed += this.friction;
			}
			if (this.hspeed > 0) {
				this.hspeed -= this.friction;
			} else if (this.hspeed < 0) {
				this.hspeed += this.friction;
			}

			this.x += this.hspeed;
			this.y += this.vspeed;
		}
	}

	draw() {
		this.drawAnimated(this.frameSeq);
	}
}

class Confetti extends Entity {
	constructor(x, y, xSpread, ySpread) {

		// Pick random confetti color
		var imgColor;
		var temp = Math.random()*5;
		if (temp < 1) {
			imgColor = confettiBlue_img;
		} else if (temp < 2) {
			imgColor = confettiGreen_img;
		} else if (temp < 3) {
			imgColor = confettiPurple_img;
		} else if (temp < 4) {
			imgColor = confettiRed_img;
		} else {
			imgColor = confettiYellow_img;
		}

		super(x, y, 2, 2, imgColor, 2, 2, [0,1,2,3], 0, 0);
		this.dead = false;

		this.alignTime = 20;// + Math.random()*20;

		this.vspeed = -(Math.random()*ySpread)
		this.hspeed = Math.random()*xSpread;
		if (Math.random() > 0.5) {
			this.hspeed = -this.hspeed;
		}

		this.fallSpeed = 1;
		this.friction = 0.1
	
	}	
	update() {
		this.updateMovement();
		this.checkDead();

		this.draw();
		if (debug) {
			this.drawCol();
		}

		if (this.alignTime > 0) {
			this.alignTime--;
		}
	}
	updateMovement() {
		if (this.alignTime == 0) {
			this.vspeed = this.fallSpeed
			if (this.hspeed > 0) {
				this.hspeed -= this.friction;
			} else if (this.hspeed < 0) {
				this.hspeed += this.friction;
			}
		}
		this.x += this.hspeed;
		this.y += this.vspeed;
	}

	draw() {
		this.drawAnimated(this.frameSeq);
	}

	// Check if out of bounds or hit some terrain
	checkDead() {
		if (this.checkEdgeCol()) {
			this.dead = true;
		}
	}
}

class Timer extends Entity {
	constructor(x, y, time) {
		super(x, y, 10, 10, timer_img, 4, 4, [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], 0,0);
		this.dead = false;

		// 16 is 1 frame more, but lets player see the full red circle
		this.animDelayTime = time/16;
	}
	update() {
		this.draw();
	}

	draw() {
		this.drawAnimated(this.frameSeq);
	}
}

class Flag extends Entity {
	constructor(x, y, owner) {

		// player 1 = green, player 2 = blue
		var flagColor;
		if (owner.playerID == 1) {
			flagColor = flagGreen_img;
		} else {
			flagColor = flagBlue_img
		}
		super(x, y, 20, 20, flagColor, 1, 2, [0,1], 0, 20);
		this.dead = false;
		this.owner = owner;
		this.acquired = false;
		this.atGoal = true;

		this.initX = x;
		this.initY = y;

		this.animDelayTime = 10;

		// Shift flag collision down 15 pixels
		this.colShiftY = 15;

		this.respawnTimer = 0;
		this.respawnTime = 20*60;

		this.timer;
	}
	update() {
		// Check if player got it
		if (!this.acquired) {
			this.checkGet();

		// Check if player drops it 
		} else {
			this.checkDead();
			this.updateMovement();
		}
		
		this.draw()

		// Draw collision to show players how to get it
		if (!this.atGoal && !this.acquired) {
			this.timer.update();
			this.tickRespawn();
			this.drawCol();
		}
	}

	// Tick down the respawn timer
	tickRespawn() {
		if (this.respawnTimer > 0) {
			this.respawnTimer--;
			if (this.respawnTimer == 0) {
				this.respawn();
			}
		}
	}

	updateMovement() {
		this.x = this.owner.x;
		this.y = this.owner.y+5;
	}

	// If player dead, drop flag and start timer
	checkDead() {
		if (this.owner.dead) {
			this.acquired = false;
			this.owner.hasFlag = false;
			this.respawnTimer = this.respawnTime;
			this.timer = new Timer(this.x+5, this.y+5, this.respawnTime);
		}
	}

	// Check if player got it
	checkGet() {
		for (var i of playerArr) {
			if (this.owner == i && this.collideWith(i) && !i.dead) {
				console.log("Player " + i.playerID + " acquired flag... player" +this.owner.playerID + "'s flag gg");
				this.acquired = true;
				this.atGoal = false;
				this.owner.hasFlag = true;
				playSound(flagGot_snd);
				break;
			}
		}
	}

	draw() {
		this.drawAnimated(this.frameSeq);
	}

	respawn() {
		this.x = this.initX;
		this.y = this.initY;
		this.acquired = false;
		this.atGoal = true;
	}
}

class Snow extends Entity {
	constructor(x, y) {
		super(x, y, 20, 20, snow_img, 4, 3, [0], 6, 6);
		this.dead = false;
		this.breaking = false;
	}
	update() {
		this.checkStep();
		this.draw();
	}
	draw() {
		if (!this.breaking) {
			this.drawAnimated(this.frameSeq);
		} else {
			this.drawAnimated([0,1,2,3,4,5,6,7,8,9,10,11]);
			if (this.finishAnim) {
				this.dead = true;
			}
		}
	}
	// Check if stepped on
	checkStep() {
		for (var i of playerArr) {
			if (this.collideWith(i)) {
				if (!this.breaking) {
					this.breaking = true;
					playSound(snowbreak_snd);
				}
				break;
			}
		}
	}
}

class Crate extends Entity {
	constructor(x, y) {
		super(x, y, 20, 20, crate_img, 1, 3, [0, 1], 0, 0);
		this.dead = false;

		this.broken = false;
		this.waitTimer = 0;
		this.waitTime = 60;

		this.animDelayTime = 40;
	}
	update() {
		this.checkGot();
		this.draw();
		if (debug) {
			this.drawCol();
		}

		if (this.waitTimer > 0) {
			this.waitTimer--;
			if (this.waitTimer == 0) {
				this.dead = true;
			}
		}
	}

	draw() {
		if (!this.dead) {
			if (this.broken) {
				this.drawAnimated([2]);
			} else {
				this.drawAnimated(this.frameSeq);
			}
		}
	}

	// Check if player got it
	checkGot() {
		for (var i of playerArr) {
			if (this.collideWith(i) && !this.dead && !this.broken) {
				this.broken = true;
				this.waitTimer = this.waitTime;
				playSound(crateOpen_snd);

				// Give random gun
				var rand = Math.random();
				if (rand < 0.2) {
					i.gun = new LaserGun(i);
				} else if (rand < 0.4) {
					i.gun = new Shotgun(i);
	     		} else if (rand < 0.6) {
	     			i.gun = new Uzi(i);
	     		} else if (rand < 0.8) {
	     			i.gun = new RocketLauncher(i);
	     		} else {
	     			i.gun = new Mine(i);
	     		}
	     		

	     		// Spawn crate in random empty spawn
	     		while (true) {
	     			var temp_y = Math.floor(Math.random()*numHeight);
	     			var temp_x = Math.floor(Math.random()*numWidth);
	     			if (levels[game.level][temp_y][temp_x] != "W") {
	     				tempArr.add(new Crate(temp_x*gridLen, temp_y*gridLen));
	     				break;
	     			}
	     		}
				
				break;
			}
		}
	}
}

class Goal extends Entity {
	constructor(x, y, owner) {
		super(x, y, 20, 20, goal_img, 1, 1, [0], 0,0);
		this.owner = owner;
	}
	update() {
		this.checkGoal();
		this.draw();
		if (debug) {
			this.drawCol();
		}
	}

	// Check if flag is returned to goal
	checkGoal() {
		for (var i of tempArr.array) {
			for (var j of i) {
				if (j instanceof Flag) {
					if (this.owner.playerID == j.owner.playerID && j.acquired && this.collideWith(j.owner)) {
						this.giveGoal(j);
					}
				}
			}
		}
	}

	// Give the goal to the player
	giveGoal(flag) {
		for (var j = 0; j < 100; j++) {
			tempArr.add(new Confetti(180, 180, 5, 9));
		}
		this.owner.hasFlag = false;
		this.owner.score++;
		flag.respawn();
		playSound(win_snd);
		console.log("winner");
	}

	draw() {
		this.drawAnimated(this.frameSeq);
	}
}

class Wall extends Entity {
	constructor(x, y) {
		super(x, y, 20, 20, wall, 4, 4, [0], 0,0);

		this.dead = false;
		this.maxHp = 10;
		this.hp = this.maxHp;

		this.invuln = false;
	}

	update() {
		this.draw();
	}

	draw() {
		if (this.hp > 0) {		
			var temp = this.maxHp-this.hp;
			this.drawAnimated([Math.floor(temp)]);
		} else {
			this.drawAnimated([10,11,12,13]);
			if (this.finishAnim) {
				this.dead = true;
			}
		}
	}

	// Damage the wall
	damageWall(dmg) {
		playSound(iceCrack_snd);
		if (this.hp <= dmg) {
			playSound(wallBreak_snd);
		}
		this.hp -= dmg;
	}
}



// A playable character controlled by a human or bot
class Player extends Entity {
	constructor(x, y, playerID, startFace) {
		var pengColor;
		//if (playerID == 1) {
			pengColor = peng;
		//} else {
		//	pengColor = peng2;
		//}

		super(x, y, 14, 14, pengColor, 1, 3, [0,1], 0,0);

		this.speed = 1;            // Move speed

		this.shootTimer = 0;       // Timer for shooting

		this.playerID = playerID;


		this.gun = new SnowGun(this);

		this.startFace = startFace;    // Initial direction the player faces
		this.angle = this.startFace;   // Current angle of object

		this.dead = false;            
		this.dying = false;           // In dying animation


		this.moving = false; // If player is moving or not

		this.canMoveTimer = 100;   // Delay before game starts

		this.initX = x;   // Remember initial spawn location
		this.initY = y;

		this.respawnTimer = 0;
		this.respawnTime = 100;

		this.score = 0;     // How many flags captured

		this.hasFlag = false;


		this.animDelayTime = 20;   // Set animation speed for initial idling
	}

	// Update function that only updates the basics
	update() {
		this.updateAmmoHUD();
		this.draw();
		if (debug) {
			this.drawCol();
		}

		if (!this.dead) {
			this.gun.update();
		} else {
			if (this.respawnTimer > 0) {
				this.respawnTimer--;
				if (this.respawnTimer == 0) {
					this.respawnTimer = this.respawnTime;
					this.respawn();
				}
			}
		}

		this.canMoveTimer--;
		if (this.shootTimer > 0) {
			this.shootTimer--;
		}
	}

	updateAmmoHUD() {
		if (!(this.gun instanceof SnowGun)) {
			var ammoHUD = document.getElementById("ammo"+this.playerID);
			ammoHUD.style.left = canvasScaling*this.x+35;
			ammoHUD.style.top = canvasScaling*this.y-25;
			ammoHUD.innerHTML = this.gun.ammo;
		}
	}


	draw() {
		// Alive sprite
		if (!this.dead) {

			// Walking animation
			if (this.moving) {
				this.drawAnimated([0, 2]);

			// Idle animation
			} else {
				this.drawAnimated(this.frameSeq);
			}

		// Dead sprite
		} else {

			// Dying animation
			if (this.dying) {
				this.drawAnimated([2,3,4,5,6,7,8]);
				if (this.finishAnim) {
					this.dying = false;
				}

			// Dead sprite
			} else {
				this.drawAnimated([8]);
			}
		}

		// Draw AMMO hud
		if (!(this.gun instanceof SnowGun)) {
			tempArr.pushHUD(ammo_img, this.x, this.y-10);
		}
	}


	shoot() {
		if (this.shootTimer == 0) {
			this.gun.shoot();
			this.shootTimer = this.gun.shootTime;
		}
	}

	// Get the player to die
	die(bulletDir) {
		this.dead = true;
		this.dying = true;

		this.animDelayTime = 4;

		this.respawnTimer = this.respawnTime;
		
		// Die with the right direction animation
		this.setAngle(DIR.right);

		// Prepare for new animation
		this.animIndex = 0;
		this.animDelay = 0;

		// Player 1 vs player 2
		var temp;
		//if (this.playerID == 1) {
			temp = playerDie_img;
		//} else {
		//	temp = player2Die_img;
		//}
		this.changeSprite(temp, 14, 14, 3, 3, [0], 20, 20);

		playSound(die_snd);
		playSound(die2_snd);



		// Reset the pathing array, current position && flag array if bot dies
		if (this instanceof(Bot)) {
			this.path = [];
			this.flag = [];
			this.currPos = this.startPos;
			console.log("i died and im a bot -> my path array reset");
		}
	}


	// Respawn the player
	respawn() {
		this.gun = new SnowGun(this);
		this.dead = false;
		this.dying = false;

		// Reset these so player faces correct direction once they respawn if they hold the keys
		this.moving = false;


		this.firstKeyPress = DIR.none;

		// Back to original spot
		this.x = this.initX;
		this.y = this.initY;

		var temp;
		//if (this.playerID == 1) {
			temp = peng;
		//} else {
		//	temp = peng2;
		//}

		// Prepare for new animation
		this.animIndex = 0;
		this.animDelay = 0;
		this.animDelayTime = 20;


		this.setAngle(this.startFace);
		this.changeSprite(temp, 14, 14, 1, 3, [0, 1], 0,0);
	}
}


// Human controlled player
class Human extends Player {
	constructor(x, y, playerID, startFace) {
		super(x, y, playerID, startFace);

		// Stores if the keys are pressed or not
		this.leftKey;   
		this.rightKey;
		this.upKey;
		this.downKey;
		this.shootKey;

		this.strafeDir = DIR.none; // Direction keep facing when strafing
		this.firstKeyPress = DIR.none;  // Key first pressed for strafing
		
	}

	update() {

		// Register keypresses for moving & shooting
		if (!this.dead && this.canMoveTimer <= 0) {
			this.updateKeypress();
			if (this.shootKey) {
				this.shoot();
			}
			this.updateMovement();
		}

		// Update the basic functions
		super.update();
	}

	// Grab keypresses from global keys object
	updateKeypress() {
		if (this.playerID == 1) {
			this.leftKey = Keys.left;
			this.rightKey = Keys.right;
			this.upKey = Keys.up;
			this.downKey = Keys.down;
			this.shootKey = Keys.space;
		} else if (this.playerID == 2) {
			this.leftKey = Keys.a;
			this.rightKey = Keys.d;
			this.upKey = Keys.w;
			this.downKey = Keys.s;
			this.shootKey = Keys.f;			
		}

		// Check if player is moving or not
		if (this.leftKey || this.rightKey || this.upKey || this.downKey) {
			if (!this.moving) {
				this.moving = true;

				// Prepare for new animation - idle to walking
				this.animIndex = 0;
				this.animDelay = 0;
				this.animDelayTime = 6;
			}
		} else {
			if (this.moving) {
				this.moving = false;

				// Prepare for new animation - walking to idle
				this.animIndex = 0;
				this.animDelay = 0;
				this.animDelayTime = 20;
			}

			this.firstKeyPress = DIR.none;
		}

		if (this.moving) {

			// Start strafing
			if (this.firstKeyPress == DIR.none) {
				if (this.leftKey) { this.firstKeyPress = DIR.left; }
				if (this.rightKey) { this.firstKeyPress = DIR.right; }
				if (this.upKey) { this.firstKeyPress = DIR.up; }
				if (this.downKey) { this.firstKeyPress = DIR.down; }
				this.setAngle(this.firstKeyPress);

			// Change strafe direction mid-strafe
			} else {
				var keyArr = this.currKeysPressed();
				if (keyArr.length == 1 && this.firstKeyPress != keyArr[0]) {
					this.firstKeyPress = keyArr[0];
					this.setAngle(this.firstKeyPress);
				}
			}
		}
	}



	// Update movement based on key presses
	updateMovement() {
		if (this.leftKey) {
			if (!this.checkEdgeColAt(-this.speed, 0) && !this.checkWallColAt(-this.speed, 0)) {
				this.x -= this.speed;
			}
		}
		if (this.rightKey) {
			if (!this.checkEdgeColAt(this.speed, 0) && !this.checkWallColAt(this.speed, 0)) {
				this.x += this.speed;
			}
		}
		if (this.upKey) {
			if (!this.checkEdgeColAt(0, -this.speed) && !this.checkWallColAt(0, -this.speed)) {
				this.y -= this.speed;
			}	
		}
			
		if (this.downKey) {
			if (!this.checkEdgeColAt(0, this.speed) && !this.checkWallColAt(0, this.speed)) {
				this.y += this.speed;
			}	
		}
			
	}

	// Return the current keys pressed
	currKeysPressed() {
		var keys = [];
		if (this.rightKey) { keys.push(DIR.right); }
		if (this.leftKey) { keys.push(DIR.left);}
		if (this.upKey) { keys.push(DIR.up); }
		if (this.downKey) { keys.push(DIR.down); }
		return keys;
	}
}


// Computer controlled player
class Bot extends Player {
	constructor(x, y, playerID, startFace, level) {
		super(x, y, playerID, startFace);
		console.log("I am a bot... i will destroy you...");

		// Store the level layout
		this.level = level;


		// This isn't updated... so won't update when walls are destroyed
		this.astar = new Astar(level);

		// Curent task of the bot
		this.task = TASK.getFlag;

		// Array containing grids which bot needs to go to
		this.path = [];

		// Array containing possible grid location of the flag
		this.flag = [];


		this.dodgeTime = 60; // Cooldown before dodging again
		this.dodgeTimer = 0;

		this.waitTimer = 0;  // How long to wait before doing stuff again


		this.dodgeWay;  // which way bullet is coming


		// Current position of bot
		this.currPos = {
			x: x/gridLen,
			y: y/gridLen
		};

		this.prevPos = this.currPos; // Previous position before currPos

		this.alleySave = this.prevPos;   // Stores the last path BEFORE an alley way turn to run from alley attacks lol...


		this.shootDir;  // Direction to shoot after moving to shooting position

		// Remember the starting coordinates
		this.startPos = this.currPos;

		// Find the coordinates for the bot's goal
		this.goal;
		for (var i = 0; i < level.length; i++) {
			for (var j = 0; j < level[i].length; j++) {
				if (level[i][j] == "T") {
					this.goal = {
						x: j,
						y: i
					};
				}
			}
		}
	}

	update() {

		// Stop moving when gameover
		if (!game.gameover) {

			// Only move if allowed
			if (!this.dead && this.canMoveTimer <= 0) {


				// Decide what task the bot needs to do
				if (this.task != TASK.dodge) {this.dodgeWay = this.checkDodge();}
				if (this.task == TASK.dodge || this.dodgeWay) {
					if (this.task != TASK.dodge) {
						console.log("task before set = " + this.task + "     <--- set task to dodge");
						this.task = TASK.dodge;
					}

				} else {

					// Shoot enemy if in range to move to  - only attack 30% of the time
					var test = this.findEnemyLoc();
					var enemyLoc = test[0];
					if (this.task != TASK.attack && Math.random() <= 0.01 &&(Math.abs(enemyLoc.x - this.currPos.x) <= 3 || Math.abs(enemyLoc.y - this.currPos.y)) <= 3) {
						console.log("task = " + this.task);
						console.log("ATTACKING TIMEEE  enemyLoc=["+enemyLoc.x+","+enemyLoc.y+"]    currPos=["+this.currPos.x+","+this.currPos.y+"]");
						this.task = TASK.attack;
						this.path = [];

					// Get flag or go home
					} else if (this.task == TASK.idle) {
						if (!this.hasFlag) {
							this.task = TASK.getFlag;
						} else {
							this.task = TASK.goHome; 
						}
						this.flag = []; // Reset the flag array to empty

					// Do nothing
					} else if (this.task == TASK.wait) {
					


					// Do nothing
					} else {

					}
				}


				// Generate path to get the flag
				if (this.task == TASK.getFlag && this.path.length == 0) {
					console.log("get flag");
					// Generate possible locations of the flag
					if (this.flag.length == 0) {
						this.flag = this.findFlagLoc();		
						console.log("generated flag locations");

					// No flag found at previous location, pop off		
					} else {
						console.log("Not in previous flag position, POPPED OFF");
						this.flag.shift();
					}

					// Find path to the flag
					if (this.flag.length != 0) {
						console.log("Flag located at ["+this.flag[0].x+","+this.flag[0].y+"]");
						this.path = this.astar.search(this.currPos, this.flag[0]);
					}


				// Generate path to go home
				} else if (this.task == TASK.goHome && this.path.length == 0) {
					console.log("gohome");
					this.path = this.astar.search(this.currPos, this.goal);



				// Dodging a bullet
				} else if (this.task == TASK.dodge && this.dodgeTimer == 0) {
					console.log("i dodged!!!!!!!!!!!!");
					this.path = this.dodgeAway();
					this.flag = [];


				// Attacking the enemy
				} else if (this.task == TASK.attack && this.path.length == 0) {
					console.log("finding path TO ATTACK");
					var temp = this.findEnemyLoc();
					var enemyLoc = temp[0];
					var dest;

					// Only find path to attack if not already at the position
					if (enemyLoc.x != this.currPos.x && enemyLoc.y != this.currPos.y) {
						console.log("lets do it");

						// X axis is shorter than y axis
						if (Math.abs(enemyLoc.x-this.currPos.x) < Math.abs(enemyLoc.y-this.currPos.y)) {
							dest = {
								x: enemyLoc.x,
								y: this.currPos.y
							};

							if (enemyLoc.y < this.currPos.y) {
								this.shootDir = DIR.up;
							} else {
								this.shootDir = DIR.down;
							}

						// Y axis is shorter than x axis
						} else {//if (Math.abs(enemyLoc.x-this.currPos.x) > Math.abs(enemyLoc.y-this.currPos.y)) {
							dest = {
								x: this.currPos.x,
								y: enemyLoc.y
							}

							if (enemyLoc.x < this.currPos.x) {
								this.shootDir = DIR.left;
							} else {
								this.shootDir = DIR.right;
							}
							// Both axis are same... so choose random. But currently go Y only
							/*} else {
								dest = {
									x: this.currPos.x,
									y: enemyLoc.y
								}					
							}*/
							// Need to check if dest is a wall or not....
							//WAAAA	
						}
						console.log("FInding path to DEST["+dest.x+","+dest.y+"]");
						this.path = this.astar.search(this.currPos, dest);
					} else {
						console.log("I'm already there... so just shoot");
						this.angle = this.shootDir;
						this.shoot();
						this.task = TASK.idle;
						console.log("i JUST SHOT AND back to idlee");
					}
				
				// Don't do anything
				} else if (this.task == TASK.idle) {
					console.log("in idle");
				}




				// Move the bot because it has somewhere to go
				if (this.path.length != 0) {

					// Not yet reached the 1st designated grid
					if (this.x != this.path[0].x*gridLen || this.y != this.path[0].y*gridLen) {
						this.moveToPos(this.path[0]);

					// Reached spot, pop off AND MOVE TO NEW SPOT
					} else {

						// Store the alleySave position in case in a corridor and need to run back
						if (this.prevPos.y == this.currPos.y && this.currPos.y != this.path[0].y) {
							this.alleySave = this.prevPos;
						}


						this.prevPos = this.currPos;
						this.currPos = this.path[0];


						//this.alleySave

						this.path.shift();
						if (this.path.length != 0) {
							this.moveToPos(this.path[0]);

						// Reeached end of the path...
						} else {
							console.log("im there now yay");
							if (this.task == TASK.attack) {
								this.angle = this.shootDir;
								this.shoot();
								this.task = TASK.idle;
								console.log("i JUST SHOT AND back to idlee");
							}
							
						}

						// Finished dodging to the designated spot
						if (this.task == TASK.dodge) {
							this.task = TASK.wait;
							this.waitTimer = 40;
							console.log("finished dodging.... wait a second");
						}

					}

					if (this.moving == false) {
						this.moving = true;

						// Preparing change in animation - from idle to walking
						this.animIndex = 0;
						this.animDelay = 0;
						this.animDelayTime = 6;
					}
				} else {

					if (this.moving) {
						this.moving = false;

						// Prepare for new animation - walking to idle
						this.animIndex = 0;
						this.animDelay = 0;
						this.animDelayTime = 20;
					}
				}


				// Shooting automatically
				/*if (this.shootTimer == 0) { 
					var enemy = playerArr[0];
					if ((this.angle == DIR.left && enemy.x < this.x) ||
					    (this.angle == DIR.right && enemy.x > this.x) ||
					    (this.angle == DIR.up && enemy.y < this.y)    ||
					    (this.angle == DIR.down && enemy.y > this.y)) {
					   	this.shoot();
					}
				}*/
			}

			if (this.dodgeTimer > 0) {
				this.dodgeTimer--;
			}
			if (this.waitTimer > 0) {
				this.waitTimer--;
				if (this.waitTimer == 0) {
					this.task = TASK.idle;
				}
			}
		}


		// Common functions dealing with updates to player
		super.update();
	}

	// Return a path thats a square away - dodges appropriately
	dodgeAway() {
		this.dodgeTimer = this.dodgeTime;

		var dodgePos = this.currPos;

		// Dodge in a random direction UNLESS at the edge of level or wall, then dodges away
		if (this.dodgeWay == DIR.up || this.dodgeWay == DIR.down) {
			if ((dodgePos.x == 0 || this.level[dodgePos.y][dodgePos.x-1] == "W") &&
				(dodgePos.x == this.level[0].length-1 || this.level[dodgePos.y][dodgePos.x+1] == "W")) {
				dodgePos = this.alleySave;
				console.log("RUNNNNING TO ALLEYSAVE WOOOHOO");
			} else if (dodgePos.x == 0 || this.level[dodgePos.y][dodgePos.x-1] == "W") {
				dodgePos.x += 1;
			} else if (dodgePos.x == this.level[0].length-1 || this.level[dodgePos.y][dodgePos.x+1] == "W") {
				dodgePos.x -= 1;
			} else {
				if (Math.random() < 0.5) {
					if (dodgePos.x > 0) {
						dodgePos.x -= 1;
					}
				} else {
					if (dodgePos.x < this.level[0].length-1) {
						dodgePos.x += 1;
					}
				}		
			}
		}

		// Dodge in a random direction UNLESS at the edge of level or wall, then dodges away
		if (this.dodgeWay == DIR.left || this.dodgeWay == DIR.right) {
			if ((dodgePos.y == 0 || this.level[dodgePos.y-1][dodgePos.x] == "W") &&
				(dodgePos.y == this.level.length-1 || this.level[dodgePos.y+1][dodgePos.x] == "W")) {
				dodgePos = this.alleySave;
				console.log("RUNNNNING TO ALLEYSAVE WOOOHOO");
			} else if (dodgePos.y == 0 || this.level[dodgePos.y-1][dodgePos.x] == "W") {
				dodgePos.y += 1;
			} else if (dodgePos.y == this.level.length-1 || this.level[dodgePos.y+1][dodgePos.x] == "W") {
				dodgePos.y -= 1;
			} else {
				if (Math.random() < 0.5) {
					if (dodgePos.y > 0) {
						dodgePos.y -= 1;
					}
				} else {
					if (dodgePos.y < this.level.length-1) {
						dodgePos.y += 1;
					}
				}
			}
		}



		var list = [];
		list.push(dodgePos);
		return list;
	}

	// Check for any snowballs that might be coming
	checkDodge() {

		// ONLY SNOWBALLS AT THE MOMENT
		for (var i = 0; i < tempArr.array[3].length; i++) {
			var snowball = tempArr.array[3][i];

			// Detecting enemy snowballs
			if (snowball instanceof Snowball && !snowball.dead && snowball.owner.playerID != this.playerID) {

				// Snowballs that are moving RIGHT towards the bot  - only 80 pixels within
				if (snowball.x < this.x && snowball.dir == DIR.right && this.x - snowball.x <= 40) {
					var snowballPos = {
						x: snowball.x,
						y: snowball.y
					};
					var playerPos = {
						x: this.x,
						y: this.y
					};

					// Check if snowball crosses over the player
					var multiple = 10;
					while (snowballPos.x < playerPos.x) {
						snowballPos.x += snowball.speed * multiple;
						var rect1 = snowball.getRectAt(snowballPos.x, snowballPos.y);
						var rect2 = this.getRectAt(this.x, this.y);
						//ctx.fillRect(rect1.x, rect1.y, snowball.width, snowball.height);
						if (testCollisionRectRect(rect1, rect2)) {
							console.log("IT PASSES THROUGH FUCKK  RIGHTT current task =" + this.task);
							return DIR.right;
						}
					}
				} else if (snowball.x > this.x && snowball.dir == DIR.left && snowball.x - this.x <= 40) {
					var snowballPos = {
						x: snowball.x,
						y: snowball.y
					};
					var playerPos = {
						x: this.x,
						y: this.y
					};

					// Check if snowball crosses over the player
					var multiple = 10;
					while (snowballPos.x > playerPos.x) {
						snowballPos.x -= snowball.speed * multiple;
						var rect1 = snowball.getRectAt(snowballPos.x, snowballPos.y);
						var rect2 = this.getRectAt(this.x, this.y);
						ctx.fillRect(rect1.x, rect1.y, snowball.width, snowball.height);
						if (testCollisionRectRect(rect1, rect2)) {
							console.log("IT PASSES THROUGH FUCKK - LEFTTTT current task =" + this.task);
							return DIR.left;
						}
					}
				} else if (snowball.y < this.y && snowball.dir == DIR.down && this.y - snowball.y <= 40) {
					var snowballPos = {
						x: snowball.x,
						y: snowball.y
					};
					var playerPos = {
						x: this.x,
						y: this.y
					};

					// Check if snowball crosses over the player
					var multiple = 10;
					while (snowballPos.y < playerPos.y) {
						snowballPos.y += snowball.speed * multiple;
						var rect1 = snowball.getRectAt(snowballPos.x, snowballPos.y);
						var rect2 = this.getRectAt(this.x, this.y);
						ctx.fillRect(rect1.x, rect1.y, snowball.width, snowball.height);
						if (testCollisionRectRect(rect1, rect2)) {
							console.log("IT PASSES THROUGH FUCKK DOWNNNN current task =" + this.task);
							return DIR.down;
						}
					}
				} else if (snowball.y > this.y && snowball.dir == DIR.up && snowball.y - this.y <= 40) {
					var snowballPos = {
						x: snowball.x,
						y: snowball.y
					};
					var playerPos = {
						x: this.x,
						y: this.y
					};

					// Check if snowball crosses over the player
					var multiple = 10;
					while (snowballPos.y > playerPos.y) {
						snowballPos.y -= snowball.speed * multiple;
						var rect1 = snowball.getRectAt(snowballPos.x, snowballPos.y);
						var rect2 = this.getRectAt(this.x, this.y);
						ctx.fillRect(rect1.x, rect1.y, snowball.width, snowball.height);
						if (testCollisionRectRect(rect1, rect2)) {
							console.log("IT PASSES THROUGH FUCKK  UPP current task =" + this.task);
							return DIR.up;
						}
					}
				}
			}
		}
		return false;
	}

	// Find the grids that the enemy is currently in
	findEnemyLoc() {
		var enemy = playerArr[0];
		var rect1 = {
			x: enemy.x-enemy.centerX+enemy.colShiftX+enemy.img.width/enemy.nCol/2-enemy.width/2,
			y: enemy.y-enemy.centerY+enemy.colShiftY+enemy.img.height/enemy.nRow/2-enemy.height/2,
			width: enemy.width,
			height: enemy.height
		};

		// Check which grid enemy is in
		var list = [];
		for (var i = 0; i < this.level.length; i++) {
			for (var j = 0; j < this.level[i].length; j++) {
				var rect2 = {
					x: j*gridLen,
					y: i*gridLen,
					width: gridLen,
					height: gridLen
				};

				// Push the coordinates of the grid
				if (testCollisionRectRect(rect1, rect2)) {
					list.push({
						x: j,
						y: i
					});
				}
			}
		}
		return list;
	}

	// Find the grids that the flag is currently in
	findFlagLoc() {

		// Find the flag object
		var flag;
		for (var i of tempArr.array) {
			for (var j of i) {
				if (j instanceof Flag) {
					if (j.owner.playerID == this.playerID) {
						flag = j;
					}
				}
			}
		}


		var list = [];
		for (var i = 0; i < this.level.length; i++) {
			for (var j = 0; j < this.level[i].length; j++) {

				// Check which grid the flag is in
				var rect1 = {
					x: flag.x-flag.centerX+flag.colShiftX+flag.img.width/flag.nCol/2-flag.width/2,
					y: flag.y-flag.centerY+flag.colShiftY+flag.img.height/flag.nRow/2-flag.height/2,
					width: flag.width,
					height: flag.height
				};
				var rect2 = {
					x: j*gridLen,
					y: i*gridLen,
					width: gridLen,
					height: gridLen
				};

				// Push the coordinates of the grid
				if (testCollisionRectRect(rect1, rect2)) {
					list.push({
						x: j,
						y: i
					});
				}
			}
		}
		return list;	
	}

	// Move from current x,y position to given position  - only if there is no wall
	moveToPos(pos) {

		// Moving left and right
		if (this.x < pos.x*gridLen) {
			if (!this.checkEdgeColAt(this.speed, 0) && !this.checkWallColAt(this.speed, 0)) {
				this.x += this.speed;
				this.setAngle(DIR.right);
			}
		} else if (this.x > pos.x*gridLen) {
			if (!this.checkEdgeColAt(-this.speed, 0) && !this.checkWallColAt(-this.speed, 0)) {
				this.x -= this.speed;
				this.setAngle(DIR.left);
			}
		}

		// Moving up and down
		if (this.y < pos.y*gridLen) {
			if (!this.checkEdgeColAt(0, this.speed) && !this.checkWallColAt(0, this.speed)) {
				this.y += this.speed;
				this.setAngle(DIR.down);
			}
		} else if (this.y > pos.y*gridLen) {
			if (!this.checkEdgeColAt(0, -this.speed) && !this.checkWallColAt(0, -this.speed)) {
				this.y -= this.speed;
				this.setAngle(DIR.up);
			}
		}			
	}


	// Find the grids that the bot is currently in
	// Can return multiple grids if standing on multiple
	findBotLoc() {
		var list = [];
		for (var i = 0; i < this.level.length; i++) {
			for (var j = 0; j < this.level[i].length; j++) {

				// Check which grid the bot is in
				var rect1 = {
					x: this.x-this.centerX+this.colShiftX+this.img.width/this.nCol/2-this.width/2,
					y: this.y-this.centerY+this.colShiftY+this.img.height/this.nRow/2-this.height/2,
					width: this.width,
					height: this.height
				};
				var rect2 = {
					x: j*gridLen,
					y: i*gridLen,
					width: gridLen,
					height: gridLen
				};

				// Push the coordinates of the grid
				if (testCollisionRectRect(rect1, rect2)) {
					list.push({
						x: j,
						y: i
					});
				}
			}
		}
		return list;
	}


}




// Array containing all the temp objects in the game with layers
class ObjectArrayLayered {
	constructor(layers) {
		this.array = [];
		this.numLayer = layers;

		this.hud = [];

		for (var i = 0; i < this.numLayer; i++) {
			this.array.push([]);
		}
	}

	// Update and draw all objects in certain layer
	updateLayer(layer) {
		for (var i = 0; i < this.array[layer].length; i++) {
			if (!this.array[layer][i].dead) {
				this.array[layer][i].update();
			}
		}
	}

	// Render all the details for the HUD
	renderHUD() {
		for (var i = 0; i < this.hud.length; i++) {
			var curr = this.hud[i];
			ctx.drawImage(curr.img, curr.x, curr.y);
		}
		this.hud = [];
	}

	// Push images to be rendered as HUD
	pushHUD(img, x, y) {
		this.hud.push({
			img: img,
			x: x,
			y: y
		})
	}

	// Add entity to layer in array
	add(entity) {

		var layer = this.determineLayer(entity);
		//console.log("put " + entity.constructor.name + " in layer " + layer);

		for (var i = 0; i < this.array[layer].length; i++) {
			if (this.array[layer][i].dead) {
				this.array[layer][i] = entity;
				return;
			}
		}
		this.array[layer].push(entity);
	}

	// Determines what layer this entity belongs in
	determineLayer(entity) {
		switch(entity.constructor.name) {

			//case "Snow":

			case "Goal":
				return 0;

			case "Crate":
				return 1;

			//case "Wall":

			case "Shell":
			case "MineBomb":
				return 2;

			//case "Player":

			case "Bullet":
			case "Missile":
			case "Pellet":
			case "LaserBlast":
			case "Snowball":
			case "Flag":
				return 3;

			case "Gun":
			case "RocketLauncher":
			case "Uzi":
			case "Shotgun":
			case "SnowGun":
			case "LaserGun":
			case "Mine":
				return 4;

			case "Smoke":
			case "Explosion":
			case "Confetti":
				return 5;
		}
	}

	// Return size of array at certain layer
	size(layer) {
		return this.array[layer].length;
	}
}


// Array containing all the objects in the game
class ObjectArray {
	constructor() {
		this.array = [];
	}

	// Update all entities
	update() {
		for (var i = 0; i < this.array.length; i++) {
			if (!this.array[i].dead) {
				this.array[i].update();
			}
		}
	}

	// Add entity to array
	add(entity) {
		for (var i = 0; i < this.array.length; i++) {
			if (this.array[i].dead) {
				this.array[i] = entity;
				return;
			}
		}
		this.array.push(entity);
	}

	// Return size of array 
	size() {
		return this.array.length;
	}
}


// Array containing the unlocked items
class UnlockArray {
	constructor() {
		this.array = [];
	}

	// Add item to the array
	add(name, desc, cost) {
		this.array.push({
			name: name,
			desc: desc,
			cost: cost
		});
	}
}