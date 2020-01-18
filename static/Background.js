/*
Background.js
Joe O'Regan
18/01/2020
Scrolling Background Image
*/
class Background extends GameObject {
    constructor(img, x, y, w, h) {
        super(img, x, y, w, h)//Pass to GameObject constructor
        this.dx = 2;
    }

    init() {
        // GameObject.prototype.init.call(this); // call base init
        console.log("init background");
    }

    draw() {
        ctx.drawImage(this.sprite, this.x, this.y, this.w, this.h);
        ctx.drawImage(this.sprite, this.x + this.w, this.y, this.w, this.h);
    }

    update() {
        this.x = (this.x - this.dx) % (this.w);//move left to right
    }

    reset() {
        GameObject.prototype.reset.call(this);
    }
}