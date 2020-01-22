const TOP_PANEL_Y = 55;
const BOTTOM_PANEL_Y = 695;
const PANEL_X = 20;
const MENU_ICON = "\u2630";

class HUD extends GameObject {
    constructor(img, x, y, w, h) {
        super(img, x, y, w, h);
        this.titleTxt = "Space Quest JS by Joe O Regan";
        this.textWidth = 0;
        this.levelTxt = "Level: " + game.level;
        this.levelWidth = 0;
        this.scoreTxt = "Score: " + game.score;
        this.scoreWidth = 0;
        this.timeTxt = "Time: " + game.state.time;
        this.timeWidth = 0;
        this.life = new Image();
        this.life.src = "img/PlayerLifeNew2.png";
        this.overTxt = "Game Over!";
    }

    draw() {
        ctx.drawImage(this.sprite, this.x, this.y, this.w, this.h); // Top Panel background
        ctx.drawImage(this.sprite, this.x, SCREEN_HEIGHT * 0.9, this.w, this.h); // Bottom Panel Background

        ctx.fillStyle = "#F00";
        ctx.strokeStyle = "#FFF";
        ctx.lineWidth = 2;
        ctx.font = "35px testFont";
        this.textWidth = ctx.measureText(this.titleTxt).width;

        ctx.fillText(this.titleTxt, (canvas.width / 2) - (this.textWidth / 2), BOTTOM_PANEL_Y); // Title
        ctx.strokeText(this.titleTxt, (canvas.width / 2) - (this.textWidth / 2), BOTTOM_PANEL_Y);

        this.textWidth = ctx.measureText(MENU_ICON).width;
        ctx.fillText(MENU_ICON, (canvas.width - this.textWidth - PANEL_X), BOTTOM_PANEL_Y);
        ctx.strokeText(MENU_ICON, (canvas.width - this.textWidth - PANEL_X), BOTTOM_PANEL_Y);

        for (var i = 1; i <= playerInstance.lives; i++) {
            if (playerInstance.lives >= i)
                ctx.drawImage(this.life, 20 + ((i - 1) * 50), 670, 40, 30); // Player lives
        }

        ctx.font = "50px testFont";
        this.levelTxt = "Level: " + game.level;
        this.scoreTxt = "Score: " + game.score;//OK
        var remainingTime = game.state.endTime - game.state.time;
        var mins = Math.floor(game.state.time / 60);
        // var secs = game.state.time % 60;
        // var mins = Math.floor(remainingTime / 60);
        var secs = remainingTime % 60;
        var seconds = ('0' + secs).slice(-2);
        this.timeTxt = "Time: " + mins + ":" + seconds;

        this.levelWidth = ctx.measureText(this.levelTxt).width;
        this.scoreWidth = ctx.measureText(this.scoreTxt).width;
        this.timeWidth = ctx.measureText(this.timeTxt).width;

        ctx.fillText(this.levelTxt, PANEL_X, TOP_PANEL_Y);
        ctx.strokeText(this.levelTxt, PANEL_X, TOP_PANEL_Y);

        ctx.fillText(this.scoreTxt, (canvas.width / 2) - (this.scoreWidth / 2), TOP_PANEL_Y);
        ctx.strokeText(this.scoreTxt, (canvas.width / 2) - (this.scoreWidth / 2), TOP_PANEL_Y);

        ctx.fillText(this.timeTxt, (canvas.width - this.timeWidth - PANEL_X), TOP_PANEL_Y);
        ctx.strokeText(this.timeTxt, (canvas.width - this.timeWidth - PANEL_X), TOP_PANEL_Y);

        if (game.over) {
            console.log("HUD Game Over");
            ctx.font = "75px testFont";
            this.textWidth = ctx.measureText(this.overTxt).width;
            ctx.fillText(this.overTxt, (canvas.width / 2) - (this.textWidth / 2), canvas.height / 2 - 25);
            ctx.strokeText(this.overTxt, (canvas.width / 2) - (this.textWidth / 2), canvas.height / 2 - 25);
        }
    }
}