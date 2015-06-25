// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.locX = -100;
    var locYOptions = [55 , 137 , 220];
    this.locY = locYOptions[Math.floor(Math.random() * 3)];
    this.speed = Math.random() * 600 + 100;

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.locX += this.speed * dt;
    // Enemy references are deleted when offscreen, so JS Garbage Collection
    // can take it out (read on Stack Overflow).
    // New enemy is also spawned and added to array w/ new speed and location.
    if (this.locX > 550) {
      allEnemies.push(new Enemy());
      delete this.locX;
      delete this.locY;
      delete this.speed;
   }
   // Collision detection system. If Bug detects player close by, it resets
   // the player's location.
   if (Math.abs(player.locX - this.locX) < 50 && Math.abs(player.locY - this.locY) < 10){
      player.locX = player.startX;
      player.locY = player.startY;
      player.score -= 50;
      tokenSpawn();
   }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.locX, this.locY);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
   this.sprite = 'images/char-boy.png';
   // Establishes  starting position for the player, which is used in reset
   this.startX = 202.5;
   this.startY = 382;
   this.locX = this.startX;
   this.locY = this.startY;
   // Sets starting score
   this.score = 0;
};

Player.prototype.update = function() {
   // this.locX and this.locY update continuously with the handleInput
   // function, this sets the current location to those new coordinates.
   this.locX = this.locX;
   this.locY = this.locY;

   // If player reaches the water, reset position and earn 100points.
   if (this.locY < 0) {
      this.locX = this.startX;
      this.locY = this.startY;
      this.score += 100;
      tokenSpawn();
   }
};

// Draws character on page, also sets font properties and draws the Score
Player.prototype.render = function() {
   ctx.drawImage(Resources.get(this.sprite), this.locX, this.locY);

   ctx.font = '900 28px Comic Sans MS';
   ctx.textAlign = 'center';
   ctx.strokeStyle = 'black';
   ctx.lineWidth = 1;
   ctx.fillStyle = 'yellow';

   ctx.fillText("Score: " + this.score, 400, 100);
   ctx.strokeText("Score: " + this.score, 400, 100);
};

// Responds to user key input, moves character in the direction pressed
// so long as it would not move them outside of the game's boundaries.
Player.prototype.handleInput = function(input) {
   if (input === 'left' && this.locX > 1) {
      this.locX -= 101;
   }
   if (input === 'up' && this.locY > 1) {
      this.locY -= 83;
   }
   if (input === 'right' && this.locX < 404) {
      this.locX += 101;
   }
   if (input === 'down' && this.locY < 381) {
      this.locY += 83;
   }
};

// Creates Token class, which will hold all of our score-increasing collectibles
var Token = function() {
   // Keeps array of images, one of which will be chosen as sprite on object initialization
   var spriteOptions = ['images/Gem-Blue.png', 'images/Gem-Green.png', 'images/Gem-Orange.png'];
   this.sprite = spriteOptions[Math.floor(Math.random() * 3)];
   // Array of all fixed-location possible places for a token to spawn,
   // location will be chosen on object initialization.
   var tokenLocations = [
      [0.5, 55], [0.5 , 137], [0.5 , 220],
      [101.5, 55], [101.5 , 137], [101.5 , 220],
      [202.5, 55], [202.5 , 137], [202.5 , 220],
      [303.5, 55], [303.5 , 137], [303.5 , 220],
      [404.5, 55], [404.5 , 137], [404.5 , 220],
   ];
   this.location = tokenLocations[Math.floor(Math.random() * 15)];
   this.locX = this.location[0];
   this.locY = this.location[1];
};

// Only update properties needed are a collision detection system and score modifyer.
Token.prototype.update = function() {
   if (Math.abs(player.locX - this.locX) < 50 && Math.abs(player.locY - this.locY) < 10){
      delete this.locX;
      delete this.locY;
      delete this.location;
      player.score += 50;
   }
};

Token.prototype.render = function() {
   ctx.drawImage(Resources.get(this.sprite), this.locX, this.locY);
};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for (var i = 0; i < 5; i++) {
      allEnemies[i] = new Enemy();
}

// Declares global variable allTokens then instantiates them all via the
// tokenSpawn function which can be called on resets.
var allTokens = [];
var tokenSpawn = function() {
   allTokens = [];
   for (var i = 0; i < 3; i++) {
      allTokens[i] = new Token();
   }
};
tokenSpawn();
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
