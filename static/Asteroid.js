/*
Asteroid.js
Joe O'Regan
18/01/2020
*/
//const explosionLargeFX = new Audio();
//explosionLargeFX.src = "sfx/explosion_large.wav";

class Asteroid extends GameObject {
    constructor(img, x, y, w, h) {
        super(img, x, y, w, h);
        this.reset();
        this.fx.src = "sfx/explosion_large.wav";
    }

    draw() {
        //GameObject.prototype.draw.call(this);        
        ctx.save();
        ctx.beginPath();
        ctx.translate(this.x + this.w / 2, this.y + this.h / 2);
        ctx.rotate(this.degrees * Math.PI / 180);
        // ctx.drawImage(this.sprite, -this.w / 2 * this.scale, -this.h / 2 * this.scale, this.w * this.scale, this.h * this.scale); // need to scale x,y,w and h
        ctx.drawImage(this.sprite, -this.w / 2, -this.h / 2, this.w, this.h); // need to scale x,y,w and h
        ctx.restore();
    }

    update() {
        this.degrees += (this.direction % 2 == 0) ? 1 : -1; // clockwise/anti-clockwise
        this.degrees %= 360;
        this.x -= this.speed;

        if (this.x < -this.w) {	// When the enemy moves off screen (left)
            this.reset();
        }
    }

    reset() {
        this.x = 1280 + (Math.floor(Math.random() * 10) + 1) * 75;
        this.y = 60 + (Math.floor(Math.random() * 10) * 44);
        this.w = 132;//reset width & height before setting scale again
        this.h = 180;
        this.direction = Math.floor(Math.random() * 10);
        this.speed = Math.floor(Math.random() * 4) + 1;
        this.degrees = Math.floor(Math.random() * 360);
        //this.scale=0.2 + Math.round(((0.1 * (Math.floor(Math.random() * 8) + 1)) * 10) / 10);//round to 1 decimal
        this.scale = 0.2 + (0.1 * (Math.floor(Math.random() * 8) + 1));
        this.w = this.w * this.scale;
        this.h = this.h * this.scale;
        // console.log("Asteroid Scale: " + this.scale);
    }

    destroy() {
        if (!mute) this.fx.play();//Explosion sound if not muted
        this.reset();
    }
}