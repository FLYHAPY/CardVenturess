const express = require('express');
const router = express.Router();
const ScoreBoardLine = require("../models/scoreboardModel");
const auth = require("../middleware/auth");


router.get('/auth', auth.verifyAuth, async function (req, res, next) {
    try {
        console.log("Get score of current player");
        if (!req.game) {
            res.status(400).send({ msg: "You are not at a game, please create or join a game" });
        } else if (req.game.state.name != "Finished") {
            res.status(400).send({
                msg:
                    "Cannot check the score. The game has not finished."
            });
        } else {
            let result = await ScoreBoardLine.getScoreBoardCurrent(req.game);
            res.status(result.status).send(result.result.export ? result.result.export():result.result);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});



router.get('/', async function (req, res, next) {
    try {
        console.log("Get score of all players");
        let result = await ScoreBoardLine.getAllGameResults();
        res.status(result.status).send(result.result.map(s=>s.export()));
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});




router.patch('/auth/close', auth.verifyAuth, async function (req, res, next) {
    try {
        console.log("Player closed the score view for the current game.");
        if (!req.game) {
            res.status(400).send({msg:"You are not at a game, please create or join a game"});
        } else if (req.game.state.name != "Finished") {
            // Do not need to check if the player is in the display score phase
            // there would be no req.game if he is not 
            res.status(400).send({msg: 
                "The game has not finished."});
        }else {
            let result = await ScoreBoardLine.closeScorePlayer(req.game);
            res.status(result.status).send(result.result);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});


module.exports = router;