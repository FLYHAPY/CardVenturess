window.onload = async function() {
    try {
        let result = await checkGame(true);
        document.getElementById('player').textContent = 
            "Hello "+window.game.player.name;
        if (result.err) throw result.err;
    } catch (err) {
        console.log(err);
       // alert("Something went wrong!")
    }
}

setInterval(checkGameStarted,1000);

async function checkGameStarted() {
    try {
        await checkGame(true);
    } catch(err) {
        console.log(err);
    }
}

async function cancel() {
    try {
        let result = await requestCancelMatch();
        if (result.successful)
            window.location.pathname = "matches.html"
        else alert("Something wrong. Not able to cancel.")
    } catch(err) {
        console.log(err);
    }
}