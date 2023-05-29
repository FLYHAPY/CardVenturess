class ScoreBoard {
    static width = 320;
    static height = 150;
    static x = 10;
    static y = 120;
    constructor(game) {
        this.game = game;
    }
    draw() {
        textAlign(LEFT, CENTER);
        textSize(16);
        textStyle(NORMAL);
        push()
        textSize(30)
        text(this.game.player.name, 100, 120)
        text(this.game.opponents[0].name, 1640, 120)
        pop()
        if (this.game.player.hp >= 0) {
            push()
            strokeWeight(0);
            stroke(0);
            fill(255, 0, 0)
            rect(94, 20, this.game.player.hp * 0.8, 60)
            pop()
        } else {
            push()
            strokeWeight(0);
            stroke(0);
            fill(255, 0, 0)
            rect(20, 20, 0, 60)
            pop()
        }
        if (this.game.opponents[0].hp >= 0) {
            push()
            strokeWeight(0);
            stroke(0);
            fill(255, 0, 0)
            scale(-1, 1);
            rect(-1710, 20, this.game.opponents[0].hp * 0.8, 60)
            pop()
        } else {
            push()
            strokeWeight(0);
            stroke(0);
            fill(255, 0, 0)
            rect(20, 20, 0, 60)
            pop()
        }
        image(GameInfo.images.health, 0, 0, 500, 100)
        image(GameInfo.images.opphealth, 1300, 0, 500, 100)

        if (this.game.state == "Finished") {
            fill(200, 0, 0);
            textSize(24);
            textStyle(BOLD);
            textAlign(CENTER, CENTER);
            text("GAMEOVER", ScoreBoard.x + 200, ScoreBoard.y - 5 + ScoreBoard.height / 4)
        }

        if (GameInfo.game.player.state != "Waiting") {
            push()
            textSize(50)
            text("Your turn!", 760, 50)
            pop()
        } else {
            push()
            textSize(50)
            text("Opp Turn!", 758, 50)
            pop()
        }

        text("Your dead cards", 30, 250)
        text("Opponent's dead cards", 1600, 250)
    }

    update(game) {
        this.game = game;
    }
}