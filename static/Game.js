const canvas = document.getElementById("spacequest");
const ctx = canvas.getContext("2d");
const SCREEN_WIDTH = 1280;
const SCREEN_HEIGHT = 720;

var gameobjects = [];
var paused = true;
var mute = false;

function init() {
    console.log("init game");
    var bg = new Background("img/bg/bg_front_spacedust1080L2.png", 0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    gameobjects.push(bg);
    //bg.init();
    for (var i = 0; i < 5; i++) {
        var asteroid = new Asteroid("img/asteroid.png", 0, 0, 132, 180);
        gameobjects.push(asteroid);
    }
    //var player = new Player("img/player.png", 25, 310, 135, 100);
    //var player=Player.createInsance("img/player.png", 25, 310, 135, 100);
    var player = Player.prototype.createInstance.call(this, "img/player.png", 25, 310, 135, 100);
    gameobjects.push(player);

    //gameobjects.forEach(obj => console.log(typeof obj));//all objects
    console.log("bg: " + bg.constructor.name);
}

function update() {
    gameobjects.forEach(obj => obj.update());
}

function draw() {
    gameobjects.forEach(obj => obj.draw());
    spaceQuestTxt.draw();
}

function loop() {
    draw();
    if (!paused) update();
    requestAnimationFrame(loop);
}

init();
loop();

//Check collisions between objects
function collision(o1, o2) {
    return (o2.x < o1.x + o1.w &&
        o2.x + o2.w > o1.x &&
        o2.y < o1.y + o1.h &&
        o2.y + o2.h > o1.y);
}

window.addEventListener('keydown', function (e) {
    // P / Esc pauses game
    if (e.keyCode == 80 || e.keyCode == 27) {
        e.preventDefault();
        paused = !paused;
    }
}, false);