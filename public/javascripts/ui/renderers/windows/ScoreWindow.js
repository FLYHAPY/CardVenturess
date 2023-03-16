
class ScoreWindow extends Window {
    constructor (x,y,width,height,score, action) {
        super(x,y,width,height);
        this.score = score;
        this.player = this.score.playerScores[0];
        this.opp = this.score.playerScores[1];
        this.createButton("Close Score",x+width/2,y+height-50,action, 150);
    }

    close() {
    }

    draw() {
        super.draw();
        if (this.opened) {
            fill(255);
            stroke(255);
            textAlign(CENTER,CENTER);
           
            textStyle(NORMAL);
            strokeWeight(3);
            for (let i=0; i<2; i++) {
                line(this.x+this.width/5,this.y+(i+2)*this.height/5,
                    this.x+4*this.width/5, this.y+(i+2)*this.height/5);
            }
            for (let i=0; i<2; i++) {
                line(this.x+(i+2)*this.width/5,this.y+this.height/5,
                    this.x+(i+2)*this.width/5, this.y+4*this.height/5);
            }
            strokeWeight(1);
            textSize(40);
            text("Score",this.x,this.y,this.width,this.height/5);
            textSize(30);
            text("Name",this.x+this.width/5,this.y+this.height/5,this.width/5,this.height/5);
            text("State",this.x+2*this.width/5,this.y+this.height/5,this.width/5,this.height/5);
            text("Points",this.x+3*this.width/5,this.y+this.height/5,this.width/5,this.height/5);
            
            text(this.player.name,this.x+this.width/5,this.y+2*this.height/5,this.width/5,this.height/5);
            text(this.player.state,this.x+2*this.width/5,this.y+2*this.height/5,this.width/5,this.height/5);
            text(this.player.points,this.x+3*this.width/5,this.y+2*this.height/5,this.width/5,this.height/5);
           
            text(this.opp.name,this.x+this.width/5,this.y+3*this.height/5,this.width/5,this.height/5);
            text(this.opp.state,this.x+2*this.width/5,this.y+3*this.height/5,this.width/5,this.height/5);
            text(this.opp.points,this.x+3*this.width/5,this.y+3*this.height/5,this.width/5,this.height/5);
            
        }
    }

}