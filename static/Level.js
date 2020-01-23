class Level extends State {
    constructor() {
        super();
        this.endTime = 30;
    }

    init(level) {
        menu.init();
        this.time = 0;
        game.level = level || STATE_LEVEL1;
        console.log("Init Level " + game.level);

        var bg = new Background("img/bg/bg_front_spacedust.png", 0, 0, SCREEN_WIDTH, SCREEN_HEIGHT); // Levels 1 & 4 background
        if (game.level == STATE_LEVEL2) {
            bg.bg1.src = "img/bg/BG1080pG.png";
        } else if (game.level == STATE_LEVEL3) {
            bg.bg1.src = "img/bg/BG1080pR.png";
        }
        this.objects.push(bg);

        for (var i = 0; i < 5; i++) {
            var asteroid = new Asteroid("img/asteroid.png", 0, 0, 132, 180);
            this.objects.push(asteroid);
        }

        this.objects.push(new Enemy("img/EnemyL1.png", 1280, 360, 120, 96));
        if (game.level >= STATE_LEVEL2) {
            // var enemy = new Enemy("img/EnemyL1.png",1280,360,120,96);
            this.objects.push(new Enemy("img/EnemyL1.png", 1300, 380, 120, 96));
            this.objects.push(new Enemy("img/EnemyL2.png", 1350, 380, 120, 96));
        }
        if (game.level >= STATE_LEVEL3) {
            this.objects.push(new Enemy("img/EnemyL2.png", 1400, 500, 120, 96));
            this.objects.push(new Enemy("img/EnemyL3.png", 1400, 500, 180, 140));
        }
        if (game.level >= STATE_LEVEL4) {
            console.log("DERP STAR")
            this.objects.push(new Enemy("img/EnemyL3.png", 1450, 100, 180, 140));
            this.objects.push(new Enemy("img/DerpStar.png", 2000, 360, 225, 225));
        }

        var hud = new HUD("img/Panel.png", 0, 0, SCREEN_WIDTH, SCREEN_HEIGHT * 0.1);
        this.objects.push(hud);

        var player = Player.prototype.createInstance.call(this, "img/player.png", 25, 310, 135, 100); // Singleton
        this.objects.push(player);
        // console.log("player created + objects: " + this.objects.length);
        // console.log("finish init level");
    }

    draw() {
        this.objects.forEach(obj => obj.draw());
        if (controller.btn.menu) {
            console.log("menu pressed");
            // Menu.prototype.update.call(this);
            // Menu.prototype.update();
            menu.draw();
        }
    }

    update() {
        this.objects.forEach(obj => obj.update());
        // console.log("level time " + this.time + " End time " + this.endTime)
        if (this.time >= this.endTime) {
            if (game.level < STATE_LEVEL4) {
                game.state.clean();
                game.state.init(++game.level);
            } else {
                game.over = true;
            }
        }
    }

    reset() { }
}