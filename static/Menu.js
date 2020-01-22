const SPLASH_TIME = 2;

class Menu extends State {
    constructor() {
        super();
        this.bg.bg1.src = "img/bg/BG1080p.png";
        this.selected = 0;
        this.items = 4;
        this.lastKey = 0;
        this.endTime = 30;
        this.options = {
            start: new Image(),
            highscores: new Image(),
            settings: new Image(),
            exit: new Image()
        }
        this.titleGame = new Image();
        this.titleMenu = new Image();
        this.fx = new Audio();
        this.fx.src = "sfx/buttonClick.wav";
        console.log("menu created");
    }

    init() {
        controller.time = 5;
        this.time = 0;
        // console.log("Menu Init")
        // console.log("obj length: " + this.objects.length)
        this.objects.push(this.bg);
        this.options.start.src = "img/menu/btnStartSelect.png";
        this.options.highscores.src = "img/menu/btnHighScores.png";
        this.options.settings.src = "img/menu/btnSettings.png";
        this.options.exit.src = "img/menu/btnExit.png";
        this.titleGame.src = "img/menu/GameTitle.png";
        this.titleMenu.src = "img/menu/MainMenu.png";
        // console.log("obj length: " + this.objects.length)
    }

    update() {
        // console.log("menu update: selected: " + this.selected)
        this.objects.forEach(obj => obj.update());
        this.selectOption();

        if (this.selected == 0) {
            this.options.start.src = "img/menu/btnStartSelect.png";
            this.options.highscores.src = "img/menu/btnHighScores.png";
            this.options.settings.src = "img/menu/btnSettings.png";
            this.options.exit.src = "img/menu/btnExit.png";
        } else if (this.selected == 1) {
            this.options.start.src = "img/menu/btnStart.png";
            this.options.highscores.src = "img/menu/btnHighScoresSelect.png";
            this.options.settings.src = "img/menu/btnSettings.png";
            this.options.exit.src = "img/menu/btnExit.png";
        } else if (this.selected == 2) {
            this.options.start.src = "img/menu/btnStart.png";
            this.options.highscores.src = "img/menu/btnHighScores.png";
            this.options.settings.src = "img/menu/btnSettingsSelect.png";
            this.options.exit.src = "img/menu/btnExit.png";
        } else if (this.selected == 3) {
            this.options.start.src = "img/menu/btnStart.png";
            this.options.highscores.src = "img/menu/btnHighScores.png";
            this.options.settings.src = "img/menu/btnSettings.png";
            this.options.exit.src = "img/menu/btnExitSelect.png";
        }
    }

    draw() {
        //console.log("menu draw");
        this.objects.forEach(obj => obj.draw());
        ctx.drawImage(this.titleGame, canvas.width / 2 - (this.titleGame.width / 2), 50, this.titleGame.width, this.titleGame.height); // Game Title
        ctx.drawImage(this.titleMenu, canvas.width / 2 - (this.titleMenu.width / 4), 150, this.titleMenu.width / 2, this.titleMenu.height / 2); // Menu Title
        //Options
        ctx.drawImage(this.options.start, canvas.width / 2 - (this.options.start.width / 4), canvas.height / 2 - (this.options.start.height / 4) - 75, this.options.start.width / 2, this.options.start.height / 2);
        ctx.drawImage(this.options.highscores, canvas.width / 2 - (this.options.highscores.width / 4), canvas.height / 2 - (this.options.highscores.height / 4) - 25, this.options.highscores.width / 2, this.options.highscores.height / 2);
        ctx.drawImage(this.options.settings, canvas.width / 2 - (this.options.settings.width / 4), canvas.height / 2 - (this.options.settings.height / 4) + 25, this.options.settings.width / 2, this.options.settings.height / 2);
        ctx.drawImage(this.options.exit, canvas.width / 2 - (this.options.exit.width / 4), canvas.height / 2 - (this.options.exit.height / 4) + 75, this.options.exit.width / 2, this.options.exit.height / 2);
        //console.log("draw + objs: " + this.objects.length)
    }

    reset() {
        controller.reset();
        this.lastKey = 0;
        this.selected = 0;
    }

    selectOption() {
        // if (controller.time >= this.lastKey + 2 && game.state.time >= SPLASH_TIME) {
        if (controller.time >= this.lastKey + 2) {
            //console.log("button time " + controller.time + " last key: " + this.lastKey)
            this.lastKey = controller.time;

            if (controller.btn.up) {
                this.selected--;
                this.fx.play();
                if (this.selected < 0) {
                    this.selected = this.items - 1;
                }
                // console.log("up: " + this.selected);
            } else if (controller.btn.down) {
                this.fx.play();
                this.selected++;
                this.selected %= this.items;
                // console.log("down: " + this.selected);
            }
            if (controller.btn.fire) {
                if (this.selected == 0) {
                    // console.log("Fire + state: " + game.level);
                    //menu.reset();
                    game.state = new Level();
                    game.state.init(STATE_LEVEL1);
                }
            }
        }
    }
}