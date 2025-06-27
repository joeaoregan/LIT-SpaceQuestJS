const RESIZE_INCREMENTS = 20; // Number of times to resize per second
const START_SCALE = 0.25

class Splash extends State {
    constructor() {
        super();
        this.scale = START_SCALE;

        setInterval(this.resize.bind(this), 1000 / RESIZE_INCREMENTS); // milliseconds / increments to get time between each resize
    }
    resize() {
        if (this.scale < 1.0)
            this.scale += (1.0 - START_SCALE) / (this.endTime * RESIZE_INCREMENTS); // Remainder scale (what's left to full size) / (number of increments over time splash screen is active)
    }

    draw() {
        ctx.beginPath();
        ctx.rect(0, 0, 1280, 720);
        ctx.fillStyle = "black";
        ctx.fill();

        this.bg.bg1.width = canvas.width * this.scale;
        this.bg.bg1.height = canvas.height * this.scale;

        this.bg.bg1x = (canvas.width - this.bg.bg1.width) / 2; // Center
        this.bg.bg1y = (canvas.height - this.bg.bg1.height) / 2;

        this.objects.forEach(obj => obj.draw());
    }
}