
// Space Quest text
const spaceQuestTxt = {
    abText: 'Space Quest JS by Joe O Regan',
    textWidth: 0,
    level: 'Level: 1',
    score: 0,
    scoreTxt: 'Score',
    time: 'Time',

    draw: function () {
        //ctx.font = ""
        ctx.fillStyle = "#F00";
        ctx.strokeStyle = "#FFF";

        ctx.font = "35px testFont";
        this.textWidth = ctx.measureText(this.abText).width;

        //if(state.current == state.game){
        ctx.lineWidth = 2;
        //console.log("canvas width: " + canvas.width);
        ctx.fillText(this.abText, (canvas.width / 2) - (this.textWidth / 2), 685);
        ctx.strokeText(this.abText, (canvas.width / 2) - (this.textWidth / 2), 685);
        // ctx.fillText(this.abText, (canvas.width / 2), 685);
        // ctx.strokeText(this.abText, (canvas.width / 2), 685);
        //}


        ctx.font = "50px testFont";
        ctx.fillText(this.level, 20, 50);
        ctx.strokeText(this.level, 20, 50);

        this.scoreTxt = "Score: " + this.score;
        this.textWidth = ctx.measureText(this.scoreTxt).width;
        ctx.fillText(this.scoreTxt, (canvas.width / 2) - (this.textWidth / 2), 50);
        ctx.strokeText(this.scoreTxt, (canvas.width / 2) - (this.textWidth / 2), 50);

        this.textWidth = ctx.measureText(this.time).width;
        ctx.fillText(this.time, (canvas.width - this.textWidth - 20), 50);
        ctx.strokeText(this.time, (canvas.width - this.textWidth - 20), 50);
    }
}