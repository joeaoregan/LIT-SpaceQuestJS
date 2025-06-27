class State {
    constructor() {
        this.objects = [];
        this.time = 0;
        this.endTime = 2;
        this.bg = new Background("img/bg/bg_front_spacedust.png", 0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);        
        this.scale=1.0;

        setInterval(
            this.timer.bind(this),
            1000
        )
    }

    timer() {
        if (!game.paused && ! game.over) this.time++;
        //console.log("State time: "+this.time);
    }

    init() {
        // console.log("state init");
        this.time = 0;
        this.bg.bg1.src = "img/SplashScreenBG.png";
        this.objects.push(this.bg);
    }

    draw() {
        // console.log("state draw");
        this.bg.bg1.
        this.objects.forEach(obj => obj.draw());
    }

    update() {
        // console.log("state update");
        if (this.time < this.endTime)
            this.objects.forEach(obj => obj.update());
        if (this.time >= this.endTime) {
            if (game.level == STATE_SPLASH) {
                console.log("change state")
                game.state = new Menu();
                this.clean();
                game.state.init();
                game.level = STATE_MENU;
            }
        }
    }

    clean() {
        // console.log("clear state")
        this.time = 0;
        this.objects.splice(0, this.objects.length);
    }

    reset() {
        this.time = 0;
    }
}