let localData, localValue, resetTimeOut, leader, up, down, left, right;

leader = document.getElementById('leader');
up = document.getElementById('up');
down = document.getElementById('down');
left = document.getElementById('left');
right = document.getElementById('right');


up.addEventListener('touchend', function () {
    player.handleInput('up')
});

down.addEventListener('touchend', function () {
    player.handleInput('down')
});

left.addEventListener('touchend', function () {
    player.handleInput('left')
});

right.addEventListener('touchend', function () {
    player.handleInput('right')
});

// Enemies our player must avoid
let Enemy = function (cord_x, cord_y, cord_s) {

    this.x = cord_x;
    this.y = cord_y;
    this.s = cord_s;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
Enemy.prototype.update = function (dt) {

    this.x += this.s * dt;

    // repeat enemy movements
    if (this.x > 606) {
        this.x = 79;
        this.s = 100 + Math.floor(Math.random() * 450);
    }

    // collision between player and enemies
    if (player.x < this.x + 60 &&
        player.x + 38 > this.x &&
        player.y < this.y + 25 &&
        30 + player.y > this.y) {
        resetTimeOut = setTimeout(function () {
            loseGame()
        }, 20);
    }
};

function loseGame() {                              
    alert("Err...Game Over!!!");                   
    clearTimeout(resetTimeOut);
    resetGame();
}

function winGame() {                                          
    alert("Congratulations!You Won!");                            
    clearTimeout(resetTimeOut);
    resetGame();
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Initialize player
let Player = function (cord_x, cord_y, playerScore, playerSpeed) { 
    this.x = cord_x;                            
    this.y = cord_y;
    this.score = playerScore;
    this.speed = playerSpeed;
    this.sprite = 'images/char-boy.png';

};

// Update player position
Player.prototype.update = function () {

    // To stop player from going outside the canvas
    if (this.y > 380) {
        this.y = 380;
    }

    if (this.x > 505) {
        this.x = 505;
    }

    if (this.x < 101) {
        this.x = 101;
    }

    // Check for player reaching river to win game
    if (this.y < 0) {

        resetTimeOut = setTimeout(function () {
            winGame()
        }, 25);
    }
};


// Draw player
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Manage key press to move player
Player.prototype.handleInput = function (keyPress) {

    if (keyPress === 'left') {
        this.x -= this.speed + 50;
    }
    else if (keyPress === 'up') {
        this.y -= this.speed + 35;     
    }
    else if (keyPress === 'right') {
        this.x += this.speed + 50;
    }
    else if (keyPress === 'down') {
        this.y += this.speed + 35;    
    }
    starCollision();
    heartCollision();
};

// Initializing enemies

let enemyPosition = [60, 140, 220];
let player = new Player(300, 380, 50, 0);
let enemy;

enemyPosition.forEach(function (posY) {
    enemy = new Enemy(80, posY, 100 + Math.floor(Math.random() * 510));
    allEnemies.push(enemy);
});

// Initialize obstacle - Rock
let Stone = function (pos_X, pos_Y) {
    this.x = pos_X;
    this.y = pos_Y;
    this.sprite = 'images/Rock.png';
};

// Draw rock
Stone.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// CHECK FOR ROCK AND PLAYER COLLISION
Stone.prototype.update = function () {
    if (player.x < this.x + 60 &&
        player.x + 38 > this.x &&
        player.y < this.y + 25 &&
        30 + player.y > this.y) {
        alert("You can't pass through Rock");
        player.x = 300;
        player.y = 380;
        stone.x = 101 * Math.floor(Math.random() * 5 + 1);
        stone.y = 60;
    }
};

let stone = new Stone(101 * Math.floor(Math.random() * 5 + 1), 60);

// INITIALIZING STAR
let Star = function (pos_X, pos_Y) {
    this.x = pos_X;
    this.y = pos_Y;
    this.sprite = 'images/Star.png';

};

// DRAWING STAR
Star.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

let star = new Star(102 * Math.floor(Math.random() * 5 + 1), 230);

// INITIALIZING HEART
let Heart = function (pos_X, pos_Y) {
    this.x = pos_X;
    this.y = pos_Y;
    this.sprite = 'images/Heart.png';

};

// DRAWING HEART
Heart.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

let heart = new Heart(101 * Math.floor(Math.random() * 5 + 1), 155);

document.addEventListener('keyup', function (event) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[event.keyCode]);
});

let score = document.getElementById('score');

// Update score when an object is collected by sprite
function updateScore(col) {
    localValue = localScore(player.score);
    if (localValue === null) {
        leader.innerHTML = 'highest score: ' + col;
    }
    else {
        leader.innerHTML = 'highest score: ' + localValue;
    }
    score.innerHTML = 'Total Score : ' + col;
}

updateScore(player.score);

// HEART SHOULD DISAPPEAR WHEN COLLECTED BY THE PLAYER
function hideHeart() {     
    heart.x = -999;
    heart.y = -999;
}

// STAR SHOULD DISAPPEAR WHEN COLLECTED BY THE PLAYER
function hideStar() {       
    star.x = -999;
    star.y = -999;
}


//   RESET GAME
function resetGame() {
    player.x = 303;
    player.y = 380;
    stone = new Stone(101 * Math.floor(Math.random() * 5 + 1), 60);
    localScore(player.score);
    player.score = 0;
    updateScore(player.score);
    star = new Star(101 * Math.floor(Math.random() * 5 + 1), 230);
    heart = new Heart(101 * Math.floor(Math.random() * 5 + 1), 155);
}

// When player collects star   --> update score
function starCollision() {
    if (player.x < star.x + 60 &&
        player.x + 38 > star.x &&
        player.y < star.y + 25 &&
        30 + player.y > star.y) {
        player.score += 500;
        updateScore(player.score);
        hideStar();
    }
}

// When player collects heart --> update score
function heartCollision() {
    if (player.x < heart.x + 60 &&
        player.x + 38 > heart.x &&
        player.y < heart.y + 25 &&
        30 + player.y > heart.y) {
        player.score += 1000;
        updateScore(player.score);
        hideHeart();
    }
}

// Save leader score to localstorage
function localScore(score) {
    localData = window.localStorage.getItem("Leader");
    if (localData < score || localData === null) {
        window.localStorage.setItem("Leader", score);
    }
    return localData;
}
