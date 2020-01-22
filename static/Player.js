/*
Player.js
Joe O'Regan
18/01/2020
*/
const MAX_HEALTH = 5;
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
    constructor(img, x, y, w, h) {
        super(img, x, y, w, h);
        this.reset(x, y);
        this.speed = 5;
        this.fireRate = 0;
        this.lastFire = 0;
        this.fireDelay = 20;
        this.health = 5;
        this.flashing = false;
        this.lives = MAX_LIVES;
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
        // console.log("fire");
        if (this.fireRate > this.lastFire + this.fireDelay) {
            var x = new Laser("img/BlueLaser.png", this.x + this.w - 20, this.y + this.h / 2);
            game.state.objects.push(x);
            //console.log('lasers'+lasers.length);
            if (!game.mute) fireFX.play();
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
                if (this.lives <= 0) game.over = true;
                if (this.lives > 0) {//decrease lives
                    // this.flashThisMany(5);
                    this.health = MAX_HEALTH;//increase health
                }
            }
        }
        /*        
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
        this.move();
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

        // Collisions
        for (var i = 0; i < game.state.objects.length; i++) {
            for (var j = 0; j < game.state.objects.length; j++) {
                if (game.state.objects[i] === game.state.objects[j]) continue;
                if (game.state.objects[i] === this && game.state.objects[j].constructor.name === "Asteroid" && (collision(game.state.objects[i], game.state.objects[j]))) {
                    /*
                    // lasers.splice(i, 1);
                    var ex = new explosion(this.x + this.w, this.y - bloodcells[j].h, 128, 16, 'ExplosionBlood'); // create explosion
                    explosions.push(ex);
                    if (!game.mute) splashFX.play();
                    // bloodcells[j].reset();
 
                    bloodcellsDestroyed++;
                    navigator.vibrate([400, 100, 400]);//vibrate mobile device if bloodcell destroyed
                    */
                    // console.log("Player/Asteroid Collision");
                    //gameobjects.splice(i, 1);//delete the laser from the game objects list
                    game.state.objects[i].updateHealth();
                    game.state.objects[j].destroy();//Reset the Asteroid
                    //if(!game.mute) explosionLargeFX.play();
                }
            }
        }
    }

    move() {
        // console.log("move player");
        // X
        if (controller.btn.left) {
            playerInstance.dx = -playerInstance.speed;
        } else if (controller.btn.right) {
            playerInstance.dx = playerInstance.speed;
        }
        // Y
        if (controller.btn.up) {
            playerInstance.dy = -playerInstance.speed;
        } else if (controller.btn.down) {
            playerInstance.dy = playerInstance.speed;
        }
        if (!controller.btn.left && !controller.btn.right) {
            playerInstance.dx = 0;
        }
        if (!controller.btn.up && !controller.btn.down) {
            playerInstance.dy = 0;
        }

        if (controller.btn.fire) {
            this.fire();
        }
    }

    reset(x, y) {
        GameObject.prototype.reset.call(this, x, y);//Call game object reset, set coords
    }
}

//var p = Player.prototype.getInstance.call(this);