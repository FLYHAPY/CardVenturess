const express = require('express');
const router = express.Router();
const Game = require("../models/gamesModel");
const Play = require ("../models/playsModel");
const auth = require("../middleware/auth");



router.get('/', auth.verifyAuth, async function (req, res, next) {
    try {
        console.log("Get games that are waiting for players");
        let result = await Game.getGamesWaitingForPlayers(req.user.id);
        if (result.status != 200) 
            res.status(result.status).send(result.result);
        else {  
            let games = [];
            for (let game of result.result) {
                games.push(game.export());
            }
            res.status(200).send(games);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});




// Get information about the game of the authenticated user 
router.get('/auth', auth.verifyAuth, async function (req, res, next) {
    try {
        console.log("Get game information for the authenticated user");
        // all the information is already on the req.game, we only need to hide irrelevant information
        res.status(200).send(req.game && req.game.export());
        } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

router.post('/', auth.verifyAuth, async function (req, res, next) {
    try {
        console.log("Create a new game");
        if (req.game) {
            res.status(400).send({msg:"You are already on a game. Only one game allowed"})
        } else {
            let result = await Game.create(req.user.id);
            res.status(result.status).send(result.result);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});


router.patch('/:id/join', auth.verifyAuth, async function (req, res, next) {
    try {
        console.log("Join game");
        if (req.game) {
            res.status(400).send({msg:"You are already on a game. Only one game allowed"})
        } else {
            let joinResult = await Game.join(req.user.id,req.params.id);
            let result = await Game.getPlayerActiveGame(req.user.id);
            let game = result.result;
            await Play.startGame(game);
            res.status(result.status).send(joinResult.result);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});


router.patch('/auth/cancel', auth.verifyAuth, async function (req, res, next) {
    try {
        console.log("Cancel game");
        if (!req.game) {
            res.status(400).send({msg:"You are not at a game, nothing to cancel"});
        } else {
            let result = await Game.cancel(req.game.id);
            res.status(result.status).send(result.result);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});


module.exports = router;