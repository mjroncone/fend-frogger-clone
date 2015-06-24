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
    this.speed = Math.floor(Math.random() * 600) + 100;

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.locX += this.speed * dt;
    if (this.locX > 550) {
      allEnemies.push(new Enemy());
      delete this.locX, this.locY, this.speed;
   };
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
   this.locX = 202.5;
   this.locY = 382;
};

Player.prototype.update = function() {
   this.locX = this.locX;
   this.locY = this.locY;
};

Player.prototype.render = function() {
   ctx.drawImage(Resources.get(this.sprite), this.locX, this.locY);
};

Player.prototype.handleInput = function(input) {
   if (input === 'left') {
      this.locX -= 101;
   };
   if (input === 'up') {
      this.locY -= 83;
   };
   if (input === 'right') {
      this.locX += 101;
   };
   if (input === 'down') {
      this.locY += 83;
   };
};




// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for (var i = 0; i < 4; i++) {
      allEnemies[i] = new Enemy();
};

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
