

class ScoreBoard {
    static width = 300;
    static height = 100;
    static x = 10;
    static y = 10;
    constructor(game) {
        this.game = game;
    }
    draw() {
        fill(100,200,100);
        stroke(0,0,0);
        rect (ScoreBoard.x,ScoreBoard.y,ScoreBoard.width,ScoreBoard.height,5,5,5,5);
        fill(0,0,0);
        textAlign(LEFT,CENTER);
        textSize(16);
        textStyle(NORMAL);
        text("Turn: "+this.game.turn,ScoreBoard.x+10,ScoreBoard.y+ScoreBoard.height/4)
        text("Player: "+this.game.player.name,ScoreBoard.x+10,ScoreBoard.y+2*ScoreBoard.height/4);
        text("Opponent: "+this.game.opponents[0].name,ScoreBoard.x+10,ScoreBoard.y+3*ScoreBoard.height/4);
        text(`(${this.game.player.state})`,ScoreBoard.x+200,ScoreBoard.y+2*ScoreBoard.height/4);
        text(`(${this.game.opponents[0].state})`,ScoreBoard.x+200,ScoreBoard.y+3*ScoreBoard.height/4);
        if (this.game.state == "Finished"){ 
            fill(200,0,0);
            textSize(24);
            textStyle(BOLD);
            textAlign(CENTER,CENTER);
            text("GAMEOVER",ScoreBoard.x+200,ScoreBoard.y-5+ScoreBoard.height/4)    
        }
    }

    update(game) {
        this.game = game;
    }
}