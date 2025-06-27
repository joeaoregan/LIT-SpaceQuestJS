const fireFXE1 = new Audio();
fireFXE1.src = "sfx/laserEnemy1.wav";
const ENEMY_LASER = -1;

class Enemy extends GameObject {
    constructor(img, x, y, w, h) {
        super(img, x, y, w, h);
        this.reset();
        this.fx.src = "sfx/explosion_large.wav";
        this.points = 25;
        this.fireRate = 0;
        this.lastFire = 0;
        this.fireDelay = 100;
        if(img === "img/EnemyL2.png"){
            this.type=2;
        }
    }

    update() {
        this.x -= this.speed;
        this.fireRate++;
        if (this.fireRate > this.lastFire + this.fireDelay) {
            this.fire();
        }
        if (this.type === 2) {
            console.log("red ship")
            if (this.x > playerInstance.x + playerInstance.w) {  // while in front of the player
                if (playerInstance.y > this.y) {
                    this.y += 1;
                } else {
                    this.y -= 1;
                }
            }
        }
    }

    reset() {
        this.x = 1280 + (Math.floor(Math.random() * 10) + 1) * 75;
        this.y = 60 + (Math.floor(Math.random() * 10) * 44);
        this.speed = Math.floor(Math.random() * 3) + 3;
    }

    destroy() {
        if (!game.mute) this.fx.play();//Explosion sound if not muted
        game.destroyedEnemies++;
        Game.prototype.get().score += this.points;
        this.reset();
    }

    fire() {
        var x = new Laser("img/BlueLaser.png", this.x - 50, this.y + this.h / 2, 10, ENEMY_LASER);
        game.state.objects.push(x);
        if (!game.mute) fireFXE1.play();
        this.lastFire = this.fireRate;
    }
}