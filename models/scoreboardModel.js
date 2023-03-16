const pool = require("../config/database");
const State = require("./statesModel");

// Auxiliary class of the ScoreBoardLine
class PlayerScore {
    constructor (id,playerId,name,state,points) {
        this.id = id;
        this.playerId = playerId;
        this.name = name;
        this.state = state;
        this.points = points;
    }
    export() {
        let score = new PlayerScore();
        score.id = this.id;
        score.name = this.name;
        score.state = this.state.name;
        score.points = this.points; 
        return score;
    }

    // Since this an auxiliary class we consider all verifications are done
    static async getPlayerScore(playerId) {
        try {
            let [dbPlayerScores] = await pool.query(`Select * from user 
            inner join user_game on ug_user_id = usr_id
            inner join scoreboard on sb_user_game_id = ug_id
            inner join scoreboard_state on sb_state_id = sbs_id
            where ug_id=?`, [playerId]);
            let dbPS = dbPlayerScores[0];
            let pScore = new PlayerScore(dbPS.usr_id,dbPS.ug_id,dbPS.usr_name,
                            new State(dbPS.sbs_id,dbPS.sbs_state),dbPS.sb_points );
            return {status:200, result: pScore};
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }
    }   
}


class ScoreBoardLine {
    constructor (gameId,playerScores) {
        this.gameId = gameId;
        this.playerScores = playerScores;
    }

    export() {
        return new ScoreBoardLine(this.gameId,this.playerScores.map(p=>p.export()));
    }

    static async getScoreBoardLine(gameId,playerIds) {
        try {
            let pScores = [];
            for (let pId of playerIds) {
                let result = await PlayerScore.getPlayerScore(pId);
                if (result.status!=200) return result;
                pScores.push(result.result);
            }
            let sbLine = new ScoreBoardLine(gameId,pScores);
            return {status:200, result: sbLine};
        }  catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }
    }

    // Considering all game state verifications are done (since they don't need new DB queries)
    // player score is always the first in the score list
    // We could be more DB efficient if we did only one query instead of one for each player
    static async getScoreBoardCurrent(game) {
        try {
            let playerIds = [game.player.id];
            for (let opp of game.opponents) {
                playerIds.push(opp.id);
            }
            let result = await ScoreBoardLine.getScoreBoardLine(game.id,playerIds);
            return result ;
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }
    }

    static async getAllGameResults() {
        try {
            let [dbSBLines] = await pool.query(`Select * from scoreboard 
            inner join user_game on sb_user_game_id = ug_id
            inner join game on ug_game_id = gm_id 
            inner join user on ug_user_id = usr_id
            inner join scoreboard_state on sb_state_id = sbs_id
            order by gm_id desc`);
            let sbLines = [];
            let currGameId = -1;
            let currSB;
            for (let line of dbSBLines) {
                if (line.gm_id != currGameId) {
                    if (currSB) sbLines.push(currSB);
                    currSB = new ScoreBoardLine(line.gm_id,[]);
                    currGameId = line.gm_id;
                }
                let pScore = new PlayerScore(line.usr_id,line.ug_id,line.usr_name,
                    new State(line.sbs_id,line.sbs_state),line.sb_points );
                currSB.playerScores.push(pScore);
            }
            if (currSB) sbLines.push(currSB);
            return {status:200, result: sbLines};
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }
    }

     // Considering all game state verifications are done (since they don't need new DB queries)
    static async closeScorePlayer(game) {
        try {
            await pool.query(`Update user_game set ug_state_id = 4 where ug_id = ?`,game.player.id);
            return {status:200, result: {msg: "Score closed. You can check all scores in the Score Board page."}};
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }
    }
}

module.exports = ScoreBoardLine;