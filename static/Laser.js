class Laser extends GameObject {
    constructor(img, x, y, speed, direction) {
        super(img, x, y, 50, 5);
        //this.sprite = new Image();
        //this.img = img;
        //this.sprite.src = "art/" + this.img + ".png";

        //this.sX = 0;
        //this.sY = 0;
        //this.w = 50;
        //this.h = 5;
        //this.x = x;
        //this.y = y;

        this.speed = speed || 10;
        this.direction = direction || 1;
    }

    draw() {
        // ctx.drawImage(this.sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        GameObject.prototype.draw.call(this);
    }

    update() {
        this.x += (this.speed * this.direction);

        for (var i = 0; i < gameobjects.length; i++) {
            // Laser moves off screen
            if (gameobjects[i] === this && (this.x > canvas.width + this.w || this.x < -this.w)) {
                gameobjects.splice(i, 1);
                console.log("Laser destroyed");
            }
            /*
                        if (lasers[i] === this && (collision(lasers[i], enemyShip)) && lasers[i].img == "LaserGreen") {
                            console.log('COLLISION!');
                            lasers.splice(i, 1);
                            score.value++;
                            score.high = Math.max(score.value, score.high);
                            localStorage.setItem("highscore", score.high);
                            //console.log('lasers'+lasers.length);
            
                            var ex = new explosion(this.x + this.w, this.y - enemyShip.h / 2, 96, 12, 'Explosion'); // create explosion
                            navigator.vibrate([500]);//vibrate mobile device if explosion
                            explosions.push(ex);
                            if (!mute) explosionFX.play();
                            enemyShip.reset();
                        }
            */
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
                    console.log("Laser/Asteroid Collision");
                    gameobjects.splice(i, 1);//delete the laser from the game objects list
                    gameobjects[j].destroy();//Reset the Asteroid
                    //if(!mute) explosionLargeFX.play();
                }
            }
            /*
                        if (lasers[i] === this && collision(lasers[i], ship) && lasers[i].img == "LaserBlue") {
                            ship.updateHealth();
                            lasers.splice(i, 1);
                        }
                        */
        }

        //updateScore();
    }
}