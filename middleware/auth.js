const User = require("../models/usersModel");
const Game = require("../models/gamesModel");
// The correct value depends maxAge of the cookie (see index.js)
const refreshPer =  1440e3; // 1440e3 milliseconds = 1 hour

module.exports.verifyAuth = async function (req, res, next) {
    try {
        let token = req.session.token;
        if (!token) {
            res.status(401).send({ msg: "Please log in." });
            return;
        }
        let result = await User.getUserByToken(token);
        if (result.status != 200) {
            res.status(result.status).send(result.result);
            return;
        }
         req.user = result.result;
        // if the user has an active game save the game info
        result = await Game.getPlayerActiveGame(req.user.id);
        if (result.status == 200)
            req.game = result.result;
        // Each time it changes the cookie expiration will be refreshed
        // Smaller number in "refreshPer" means we refresh more times 
        req.session.timestamp =  Math.floor(Date.now() / refreshPer)
        // passing  to next rule
        next();
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
} 