/*
GameOject.js
Joe O'Regan
18/01/2020
Base Game Object
*/
class GameObject {
    constructor(img, x, y, w, h) {
        this.sX = 0;
        this.sY = 0;
        this.sw = 10;//Original image dimension
        this.sh = 10;
        this.x = x || 0;
        this.y = y || 0;
        this.w = w || 10;//Required image dimension
        this.h = h || 10;
        this.dx = 0;
        this.dy = 0;
        this.sprite = new Image();
        this.sprite.src = img || "img/bg/bg_front_spacedust1080L2.png";
        this.fx = new Audio();
        // this.health = 10;
        this.lives = 3;
        // this.id="";
        this.speed = 0;
    }

    init() {
        console.log("init GameObject");
    }

    draw() {
        //ctx.drawImage(this.sprite, this.sX, this.sY, this.sw, this.sh, this.x, this.y, this.w, this.h);
        ctx.drawImage(this.sprite, this.x, this.y, this.w, this.h);
    }

    update() {
        //this.x = (this.x - this.dx) % (this.w);
        if (this.speed > 0) {
            this.x -= this.speed;
        }
    }

    reset(x, y) {
        this.x = x || 0;
        this.y = y || 0;
        this.dx = 0;
        this.dy = 0;
    }
}