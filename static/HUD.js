const TOP_PANEL_Y = 55;
const BOTTOM_PANEL_Y = 695;
const PANEL_X = 20;
const MENU_ICON = "\u2630";
const PAUSE_ICON = "\u275A\u275A";

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
        // this.menuHover = false;
        this.menu = {
            x: 0,
            y: BOTTOM_PANEL_Y - 32,
            w: 40,
            h: 40
        }
    }

    // menuHover(action) {
    menuHover() {
        if (controller.mouse.overX > this.menu.x
            && controller.mouse.overX < this.menu.x + this.menu.w
            && controller.mouse.overY > this.menu.y
            && controller.mouse.overY < this.menu.y + this.menu.h
        ) {
            // return true;
            ctx.beginPath();
            ctx.strokeStyle = "#0F0";
            ctx.rect(this.menu.x, this.menu.y, this.menu.w, this.menu.h);
            ctx.stroke();
            ctx.fillStyle = "#0F0";
        }
        ctx.strokeStyle = "#FFF";
    }
    
    mouseClick() {
        if (controller.mouse.x > this.menu.x
            && controller.mouse.x < this.menu.x + this.menu.w
            && controller.mouse.y > this.menu.y
            && controller.mouse.y < this.menu.y + this.menu.h) {
            // console.log("Clicked");
            //if(action=="pause") game.paused=!game.paused;
            // game.paused = !game.paused;
            game.pause();
            controller.mouse.x = controller.mouse.y = 0;
        }
        // return false;
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

        //ctx.strokeStyle = (this.menuHover) ? "#FFF" : "#0F0";
        this.textWidth = ctx.measureText(MENU_ICON).width;
        this.menu.x = canvas.width - this.textWidth - PANEL_X - 4;
        // this.me-uHover("");
        this.menuHover();
        ctx.fillText(MENU_ICON, (canvas.width - this.textWidth - PANEL_X), BOTTOM_PANEL_Y);
        ctx.strokeText(MENU_ICON, (canvas.width - this.textWidth - PANEL_X), BOTTOM_PANEL_Y);
        // ctx.strokeStyle = "#FFF";
        ctx.fillStyle = "#F00";

        // Pause
        this.textWidth = ctx.measureText(PAUSE_ICON).width;
        this.menu.x = canvas.width - this.textWidth - PANEL_X - 54;
        // this.menuHover("pause");
        this.menuHover();


        // game.paused = 
        this.mouseClick();


        ctx.fillText(PAUSE_ICON, (canvas.width - this.textWidth - PANEL_X - 50), BOTTOM_PANEL_Y);
        ctx.strokeText(PAUSE_ICON, (canvas.width - this.textWidth - PANEL_X - 50), BOTTOM_PANEL_Y);
        // ctx.strokeStyle = "#FFF";
        ctx.fillStyle = "#F00";

        // Change menu icon colour on mouse hover

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