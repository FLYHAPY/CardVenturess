function changePage(url,msg,verbose) {
    window.location.pathname = url;
    if (verbose) alert(msg);
}


// It will go to the login page if not authenticated
// Otherwise it will set the window.user with the user profile
async function checkAuthenticated(verbose) {
    try {
        let result = await requestProfile();
        if (result.unauthenticated)
            changePage("index.html","Not authenticated. Going to login page",verbose);
        else if (!result.successful || result.err) 
            throw err || "Not successful";
        else window.user = result.user;
        return {successful: true};
    } catch (err) {
        console.log(err);
        return {err:err};
    }
}

// It will go to the login page if not authenticated
// It will go to the correct page depending on the state of our game:
// - We have no game running: matches page
// - We have a game running but no opponent: waiting page
// - We have a game with opponent: game page
// Otherwise it will set the window.game with the user profile
async function checkGame(verbose) {
    try {
        result = await requestPlayerGame();
        if (result.err) throw result.err
        else if (result.unauthenticated) 
            changePage("index.html","Not authenticated. Going to login page",verbose);
        else if (!result.game){
            if (window.location.pathname != "/matches.html") 
                changePage("matches.html","Not in a game. Going to matches page",verbose);
        } else {
            window.game = result.game;
            if (result.game.state == "Waiting") {
              if (window.location.pathname != "/waiting.html")
                changePage("waiting.html","You have created a game, going for the waiting for players page",verbose);
            } else if (window.location.pathname != "/game.html") {
                changePage("game.html","You are in a game. Going to the game page",verbose);
            }
        }
        return {successfull: true};
    } catch (err) {
        console.log(err);
        return {err:err};
    }
}
