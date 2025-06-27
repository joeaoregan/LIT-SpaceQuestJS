class Laser extends GameObject {
    constructor(img, x, y, speed, direction) {
        super(img, x, y, 50, 5);
        this.speed = speed || 10;
        this.direction = direction || 1;
    }

    draw() {
        // ctx.drawImage(this.sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        GameObject.prototype.draw.call(this);
    }

    update() {
        this.x += (this.speed * this.direction);

        for (var i = 0; i < game.state.objects.length; i++) {
            // Laser moves off screen
            if (game.state.objects[i] === this && (this.x > canvas.width + this.w || this.x < -this.w)) {
                game.state.objects.splice(i, 1);
                // console.log("Laser destroyed");
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
                            if (!game.mute) explosionFX.play();
                            enemyShip.reset();
                        }
            */
            for (var j = 0; j < game.state.objects.length; j++) {
                if (game.state.objects[i] === game.state.objects[j]) continue; // Laser can't collide with itself
                if (game.state.objects[i] === this) { // Object i is a laser
                    if (game.state.objects[i].direction != ENEMY_LASER) { // Laser is not an enemy laser
                        if (game.state.objects[j].constructor.name === "Asteroid" && (collision(game.state.objects[i], game.state.objects[j]))) {
                            /*
                            // lasers.splice(i, 1);
                            var ex = new explosion(this.x + this.w, this.y - bloodcells[j].h, 128, 16, 'ExplosionBlood'); // create explosion
                            explosions.push(ex);
                            if (!game.mute) splashFX.play();
                            // bloodcells[j].reset();
         
                            bloodcellsDestroyed++;
                            navigator.vibrate([400, 100, 400]);//vibrate mobile device if bloodcell destroyed
                            */
                            game.state.objects.splice(i, 1);//delete the laser from the game objects list                    
                            game.state.objects[j].destroy();//Reset the Asteroid
                            // console.log("Laser/Asteroid Collision - Asteroids Destroyed: " + game.destroyedAsteroids);
                            //if(!game.mute) explosionLargeFX.play();
                        }
                        if (game.state.objects[j].constructor.name === "Enemy" && (collision(game.state.objects[i], game.state.objects[j]))) {
                            game.state.objects.splice(i, 1);//delete the laser from the game objects list
                            game.state.objects[j].destroy();//Reset the Enemy
                        }
                    } else {
                        // Player shot by enemy
                        if (game.state.objects[j].constructor.name === "Player" && (collision(game.state.objects[i], game.state.objects[j]))) {
                            game.state.objects[j].updateHealth();
                            game.state.objects.splice(i, 1);;//Reset the Asteroid
                        }
                    }
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