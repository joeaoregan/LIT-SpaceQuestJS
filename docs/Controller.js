class Controller {
    constructor() {
        this.time = 0;
        this.btn = {
            up: false,
            down: false,
            left: false,
            right: false,
            fire: false,
            menu: false
        };

        this.mouse = {
            x: 0,
            y: 0,
            down: false,
            up: false,
            over: true,
            overX: 0,
            overY: 0
        };

        setInterval(this.timer.bind(this), 100);
    }

    timer() {
        this.time++;
    }

    init() {
        this.time = 0;
    }

    reset() {
        this.time = 0;
        this.btn.up = false;
        this.btn.down = false;
        this.btn.left = false;
        this.btn.right = false;
        this.btn.fire = false;
        this.btn.menu = false;
    }
}

// Keyboard Controls
window.addEventListener('keydown', function (e) {
    switch (e.keyCode) {
        case 65: // A
        case 37: // Left
        case 100: // 4
            controller.btn.left = true;
            e.preventDefault();
            // console.log('Left');
            break;
        case 87: // W
        case 38: // Up
        case 104: // 8
            controller.btn.up = true;
            e.preventDefault();
            // console.log('Up');
            break;
        case 68: // D
        case 39: // Right
        case 102: // 6
            controller.btn.right = true;
            e.preventDefault();
            // console.log('Right');
            break;
        case 83: // S
        case 40: // Down
        case 98: // 2
            controller.btn.down = true;
            e.preventDefault();
            // console.log('Down ');
            break;
        case 32://space
            controller.btn.fire = true;
            e.preventDefault();
            // console.log('Fire');
            break;
        case 77: // Esc
            controller.btn.menu = !controller.btn.menu; // toggle on/off
            //game.paused = !game.paused; // toggle the game paused
            //game.pause();
            e.preventDefault();
            // this.console.log("menu");
            break;
    }
}, false);

document.addEventListener('keyup', function (event) {
    switch (event.keyCode) {
        case 65: // A
        case 37: // Left
        case 100: // 4
            controller.btn.left = false;
        case 68: // D
        case 39: // Right
        case 102: // 6
            controller.btn.right = false;
            break;
        case 87: // W
        case 38: // Up
        case 104: // 8
            controller.btn.up = false;
        case 83: // S
        case 40: // Down
        case 98: // 2
            controller.btn.down = false;
            break;
        case 32:
            controller.btn.fire = false;
            break;
    }
});

window.addEventListener('mouseup', function (e) {
    const canvas = document.getElementById("spacequest");
    const rect = canvas.getBoundingClientRect(); // Canvas offset
    controller.mouse.x = Math.floor(e.pageX - rect.left);
    controller.mouse.y = Math.floor(e.pageY - rect.top);
    // controller.mouse.down = false;
    console.log("Clicked x: " + controller.mouse.x + " y: " + controller.mouse.y);
});
// window.addEventListener('mousedown', function (e) {
//     controller.mouse.down = true;
// });
window.addEventListener('mousemove', function (e) {
    // controller.mouse.over = true;
    const canvas = document.getElementById("spacequest");
    const rect = canvas.getBoundingClientRect(); // Canvas offset
    controller.mouse.overX = Math.floor(e.pageX - rect.left);
    controller.mouse.overY = Math.floor(e.pageY - rect.top);
    // console.log("OVER -- x: " + controller.mouse.overX + " y: " + controller.mouse.overY);
});
// window.addEventListener('mouseout', function (e) {
//     controller.mouse.over = false;
// });