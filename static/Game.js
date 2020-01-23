const canvas = document.getElementById("spacequest");
const ctx = canvas.getContext("2d");
const SCREEN_WIDTH = 1280; // Canvas/screen dimensions
const SCREEN_HEIGHT = 720;
const STATE_MENU = 0; // Game states
const STATE_LEVEL1 = 1;
const STATE_LEVEL2 = 2;
const STATE_LEVEL3 = 3;
const STATE_LEVEL4 = 4;
const STATE_OVER = 5;
const STATE_TRANSITION = 6;
const STATE_SPLASH = 7;
const LEVEL_TIME = 3; // Length of each level

class Game {
    constructor(level) {
        this.score = 0;
        this.paused = false;
        this.level = level || STATE_SPLASH; // start at menu
        this.mute = false;
        this.destroyedAsteroids = 0;
        this.destroyedEnemies = 0;
        this.totalAsteroids = 0;
        this.totalEnemies = 0;
        this.over = false;
        this.state = new Splash();
    }

    create() {
        if (!game) {
            game = new Game();
        }
        return game;
    }

    get() {
        if (!game) {
            game = new Game();
        }
        return game;
    }
}

var game = new Game();
var controller = new Controller();

function loop() {
    if (!game.paused && !game.over) {
        game.state.update();
    }
    game.state.draw();
    requestAnimationFrame(loop); // Must be outside if statement to resume after pause
}

game.state.init();
loop();

function collision(o1, o2) {
    //Check collisions between objects
    return (o2.x < o1.x + o1.w &&
        o2.x + o2.w > o1.x &&
        o2.y < o1.y + o1.h &&
        o2.y + o2.h > o1.y);
}

window.addEventListener('keydown', function (e) {
    if (e.keyCode == 80 || e.keyCode == 27) {// P / Esc pauses game
        e.preventDefault();
        game.paused = !game.paused;
        console.log("pause")
    }
}, false);

var menu = new Menu();