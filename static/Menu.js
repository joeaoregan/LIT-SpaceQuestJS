const SPLASH_TIME = 2;
const BUTTON_START = 0;
const BUTTON_HIGHSCORES = 1;
const BUTTON_SETTINGS = 2;
const BUTTON_EXIT = 3;
const SELECTED_OPTION = "Select";
const BUTTON_SCALE = 0.75;

class ButtonCenter {
    constructor(src, selected, y, scale) {
        this.image = new Image();
        this.image.src = src;
        this.x = (canvas.width - (this.image.width * scale)) / 2;
        this.y = (canvas.height - (this.image.height * scale)) * y;
        this.w = this.image.width * scale;
        this.h = this.image.height * scale;
        // console.log("x: " + this.x + " y: " + this.y + " w: " + this.w + " h: " + this.h)
        this.selected = selected;
    }
}

class Menu extends State {
    constructor() {
        super();
        this.bg.bg1.src = "img/bg/BG1080p.png";
        this.selected = 0;
        this.clicked = false;
        this.items = 4;
        this.lastKey = 0;
        this.endTime = 30;
        this.titleGame = new Image();
        this.titleMenu = new Image();
        this.fx = new Audio();
        this.fx.src = "sfx/buttonClick.wav";
        this.btns = {
            start: new ButtonCenter("img/menu/btnStartSelect.png", BUTTON_START, 3 / 8, BUTTON_SCALE),
            highscores: new ButtonCenter("img/menu/btnHighScores.png", BUTTON_HIGHSCORES, 4 / 8, BUTTON_SCALE),
            settings: new ButtonCenter("img/menu/btnSettings.png", BUTTON_SETTINGS, 5 / 8, BUTTON_SCALE),
            exit: new ButtonCenter("img/menu/btnExit.png", BUTTON_EXIT, 6 / 8, BUTTON_SCALE)
        }

        // addEventListener('mousemove', function(e){
        //     const rect = canvas.getBoundingClientRect();
        //     this.mouseX = Math.floor(e.pageX- rect.left);
        //     this.mouseY = Math.floor(e.pageY- rect.top);
        //     // console.log("mouse x: " + this.mouseX + " y: " + this.mouseY);
        // });
    }

    init() {
        controller.time = 5;
        this.time = 0;
        // console.log("Menu Init - obj length: " + this.objects.length)
        this.objects.push(this.bg);
        this.titleGame.src = "img/menu/GameTitle.png";
        this.titleMenu.src = "img/menu/MainMenu.png";
        // console.log("obj length: " + this.objects.length)
    }

    buttonImages() {
        this.btns.start.image.src = "img/menu/btnStart" + (this.selected == BUTTON_START ? SELECTED_OPTION : "") + ".png"; // Start game
        this.btns.highscores.image.src = "img/menu/btnHighScores" + (this.selected == BUTTON_HIGHSCORES ? SELECTED_OPTION : "") + ".png"; // Not implemented
        this.btns.settings.image.src = "img/menu/btnSettings" + (this.selected == BUTTON_SETTINGS ? SELECTED_OPTION : "") + ".png"; // Not implemented
        this.btns.exit.image.src = "img/menu/btnExit" + (this.selected == BUTTON_EXIT ? SELECTED_OPTION : "") + ".png"; // Redirect to portfolio page
    }

    update() {
        // console.log("menu update: selected: " + this.selected)
        this.objects.forEach(obj => obj.update());
        this.selectOption();
        this.buttonImages();
        for (var btn in this.btns) {
            this.checkClicks(this.btns[btn]);
            this.checkHover(this.btns[btn]);
        }
    }

    checkClicks(btn) {
        var left = btn.x;
        var right = left + btn.w;
        var top = btn.y;
        var bottom = btn.y + btn.h;

        if (controller.mouse.x > left
            && controller.mouse.x < right
            && controller.mouse.y > top
            && controller.mouse.y < bottom) {
            // console.log("Start button clicked - Left: " + left + " Right: " + right + " Top: " + top + " Bottom: " + bottom);
            // console.log(btn.image.src + "CLICKED!!!");
            // this.selected = btn.selected;
            this.clicked = true;
        }
    }

    checkHover(btn) {
        var left = btn.x;
        var right = left + btn.w;
        var top = btn.y;
        var bottom = btn.y + btn.h;
        // console.log("mouse x: " + this.mouseX + " y: " + this.mouseY);

        if (controller.mouse.overX > left
            && controller.mouse.overX < right
            && controller.mouse.overY > top
            && controller.mouse.overY < bottom) {
            this.selected = btn.selected;
            // console.log("mouse x: " + this.mouseX + " y: " + this.mouseY);
        }
    }

    draw() {
        // console.log("menu draw");
        this.objects.forEach(obj => obj.draw());
        ctx.drawImage(this.titleGame, canvas.width / 2 - (this.titleGame.width / 2), 50, this.titleGame.width, this.titleGame.height); // Game Title
        ctx.drawImage(this.titleMenu, canvas.width / 2 - (this.titleMenu.width / 4), 150, this.titleMenu.width / 2, this.titleMenu.height / 2); // Menu Title
        // Options
        ctx.drawImage(this.btns.start.image, this.btns.start.x, this.btns.start.y, this.btns.start.w, this.btns.start.h);
        ctx.drawImage(this.btns.highscores.image, this.btns.highscores.x, this.btns.highscores.y, this.btns.highscores.w, this.btns.highscores.h);
        ctx.drawImage(this.btns.settings.image, this.btns.settings.x, this.btns.settings.y, this.btns.settings.w, this.btns.settings.h);
        ctx.drawImage(this.btns.exit.image, this.btns.exit.x, this.btns.exit.y, this.btns.exit.w, this.btns.exit.h);
        // console.log("draw + objs: " + this.objects.length)
    }

    reset() {
        controller.reset();
        this.lastKey = 0;
        this.selected = 0;
    }

    selectOption() {
        if (controller.time >= this.lastKey + 2) { // console.log("button time " + controller.time + " last key: " + this.lastKey)
            this.lastKey = controller.time;

            if (controller.btn.up) {
                this.selected--; // console.log("up: " + this.selected);
                this.fx.play();
                if (this.selected < 0) {
                    this.selected = this.items - 1;
                }
            } else if (controller.btn.down) {
                this.fx.play();
                this.selected++; // console.log("down: " + this.selected);
                this.selected %= this.items;
            }
            if (controller.btn.fire || this.clicked) {
                if (this.selected == BUTTON_START) {
                    game.state = new Level();
                    game.state.init(STATE_LEVEL1);
                } else if (this.selected == BUTTON_HIGHSCORES) {
                    console.log("High Scores not implemented");
                    this.clicked = false;
                } else if (this.selected == BUTTON_SETTINGS) {
                    console.log("Settings not implemented");
                    this.clicked = false;
                } else if (this.selected == BUTTON_EXIT) {
                    document.location.href = "https://joeaoregan.github.io/"; // Go to portfolio page
                }
            }
        }
    }
}