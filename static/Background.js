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
        this.bg1 = new Image();
        this.bg1.src = "img/bg/BG1080p.png";
        this.bg1.width = 1280;
        this.bg1.height = 720;
        this.bg1x = 0;
        this.bg1y = 0;
    }

    init() {
        // GameObject.prototype.init.call(this); // call base init
        // console.log("init background");
    }

    draw() {
        ctx.drawImage(this.bg1, this.bg1x, this.bg1y, this.bg1.width, this.bg1.height); // Background
        ctx.drawImage(this.sprite, this.x, this.y, this.w, this.h); // Scrolling Dust Cloud
        ctx.drawImage(this.sprite, this.x + this.w, this.y, this.w, this.h);
    }

    update() {
        this.x = (this.x - this.dx) % (this.w);//move left to right
    }

    reset() {
        GameObject.prototype.reset.call(this);
    }
}