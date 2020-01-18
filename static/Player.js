/*
Player.js
Joe O'Regan
18/01/2020
*/
const MAX_HEALTH = 10;
const MAX_LIVES = 3;
const HEALTHBAR_W = 75;
const HEALTHBAR_H = 10;
const HEALTHBAR_X = 10;
const HEALTHBAR_Y = -15;

var playerInstance;

const fireFX = new Audio();
fireFX.src = "sfx/laser_ship.wav";
const damageFX = new Audio();
damageFX.src = "sfx/damage.wav";

class Player extends GameObject {
    // instance; // not sure how to access here
    constructor(img, x, y, w, h) {
        super(img, x, y, w, h);
        this.reset(x, y);
        this.speed = 5;
        this.fireRate = 0;
        this.lastFire = 0;
        this.fireDelay = 0;
        //this.health=MAX_HEALTH;
        this.flashing = false;

    }

    createInstance(img, x, y, w, h) {
        if (!playerInstance) {
            playerInstance = new Player(img, x, y, w, h);
        }

        return playerInstance;
    }

    getInstance() {
        return playerInstance;
    }

    fire() {
        console.log("fire");
        if (this.fireRate > this.lastFire + this.fireDelay) {
            var x = new Laser("img/BlueLaser.png", this.x + this.w - 20, this.y + this.h / 2);
            gameobjects.push(x);
            //console.log('lasers'+lasers.length);
            if (!mute) fireFX.play();
            this.lastFire = this.fireRate;
            //console.log('fireRate: '+this.fireRate+' lastFire: '+this.lastFire);
        }
    }

    healthbar() {
        ctx.beginPath();
        ctx.lineWidth = "1";
        ctx.strokeStyle = "black";
        ctx.rect(this.x + 10, this.y - 15, HEALTHBAR_W, HEALTHBAR_H);
        ctx.stroke();

        ctx.fillStyle = "#990000";
        ctx.fillRect(this.x + HEALTHBAR_X, this.y + HEALTHBAR_Y, HEALTHBAR_W, HEALTHBAR_H);

        ctx.fillStyle = "#009900";
        ctx.fillRect(this.x + HEALTHBAR_X, this.y + HEALTHBAR_Y, HEALTHBAR_W * this.health / MAX_HEALTH, HEALTHBAR_H);
    }

    updateHealth() {
        if (!this.flashing) {
            damageFX.play();

            if (this.health > 1) {
                this.health--;
                // this.flashThisMany(2);
                // navigator.vibrate([300, 100, 300, 100, 300]);//vibrate mobile device if hit
            } else {
                this.lives--;
                // console.log('Player Life Lost - Lives: ', this.lives);
                if (this.lives > 0) {//decrease lives
                    // this.flashThisMany(5);
                    this.health = MAX_HEALTH;//increase health
                }
            }
        }
        /*
                if (this.lives <= 0) {
                    state.current = state.over;
                    this.reset();
                }
        
                if (this.lives == 1) {
                    spawnLife();
                }
        */
    }

    draw() {
        GameObject.prototype.draw.call(this);
        ctx.globalAlpha = 0.5;
        this.healthbar();
        ctx.globalAlpha = 1.0;
    }

    update() {
        this.fireRate++;
        this.x += this.dx;
        this.y += this.dy;

        if (this.x < 0) {
            this.x = 0;
        } else if (this.x > SCREEN_WIDTH - this.w) {
            this.x = SCREEN_WIDTH - this.w;
        }
        if (this.y < 40) {
            this.y = 40;
        } else if (this.y > SCREEN_HEIGHT - this.h) {
            this.y = SCREEN_HEIGHT - this.h;
        }


        
        for (var i = 0; i < gameobjects.length; i++) {                        
            for (var j = 0; j < gameobjects.length; j++) {
                if (gameobjects[i] === gameobjects[j]) continue;
                if (gameobjects[i] === this && gameobjects[j].constructor.name === "Asteroid" && (collision(gameobjects[i], gameobjects[j]))) {
                    /*
                    // lasers.splice(i, 1);
                    var ex = new explosion(this.x + this.w, this.y - bloodcells[j].h, 128, 16, 'ExplosionBlood'); // create explosion
                    explosions.push(ex);
                    if (!mute) splashFX.play();
                    // bloodcells[j].reset();
 
                    bloodcellsDestroyed++;
                    navigator.vibrate([400, 100, 400]);//vibrate mobile device if bloodcell destroyed
                    */
                    console.log("Player/Asteroid Collision");
                    //gameobjects.splice(i, 1);//delete the laser from the game objects list
                    gameobjects[i].updateHealth();
                    gameobjects[j].destroy();//Reset the Asteroid
                    //if(!mute) explosionLargeFX.play();
                }
            }
        }
    }

    reset(x, y) {
        GameObject.prototype.reset.call(this, x, y);//Call game object reset, set coords
    }
}

var p = Player.prototype.getInstance.call(this);
// Keyboard Controls
window.addEventListener('keydown', function (e) {
    switch (e.keyCode) {
        case 65: // A
        case 37: // Left
        case 100: // 4
            //player.dx = -ship.speed;
            playerInstance.dx = -playerInstance.speed;
            e.preventDefault();
            //console.log('Left');
            break;
        case 87: // W
        case 38: // Up
        case 104: // 8
            // player.dy = -ship.speed;
            playerInstance.dy = -playerInstance.speed;
            e.preventDefault();
            //console.log('Up');
            break;
        case 68: // D
        case 39: // Right
        case 102: // 6
            // player.dx = ship.speed;
            playerInstance.dx = playerInstance.speed;
            e.preventDefault();
            //console.log('Right');
            break;
        case 83: // S
        case 40: // Down
        case 98: // 2
            // player.dy = ship.speed;
            playerInstance.dy = playerInstance.speed;
            e.preventDefault();
            //console.log('Down ' + ship.dy);
            break;
        case 32://space
            playerInstance.fire();
            break;
    }
}, false);

document.addEventListener('keyup', function (event) {
    switch (event.keyCode) {
        case 65: // A
        case 37: // Left
        case 100: // 4
        case 68: // D
        case 39: // Right
        case 102: // 6
            // player.dx = 0;
            playerInstance.dx = 0;
            break;
        case 87: // W
        case 38: // Up
        case 104: // 8
        case 83: // S
        case 40: // Down
        case 98: // 2
            // player.dy = 0;
            playerInstance.dy = 0;
            break;
    }
});