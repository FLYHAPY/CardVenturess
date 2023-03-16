window.onload = async function () {
    try {
        let result = await checkAuthenticated(true);
        if (result.err) {  throw result.err; }
        document.getElementById('player').textContent = "Hello "+window.user.name;
        result = await checkGame(true);
        if (result.err) throw result.err;
        result = await requestWaitingMatches();
        if (!result.successful || result.err)
            throw result.err || { err: "Not successfull" }
        fillMatches(result.matches);
    } catch (err) {
        console.log(err);
       // alert("Something went wrong!")
    }
}

function fillMatches(matches) {
    let container = document.getElementById("matches");
    for (let match of matches) {
        let elem = document.createElement("section");
        elem.onclick = () => join(match.id);
        let p = document.createElement("p");
        if (match.player) // this should not happen
            p.textContent = `Your game!`
        else if (match.opponents.length > 0)
            p.textContent = `Join ${match.opponents[0].name}`;
        else continue; // Something wrong with this game (no players)
        elem.appendChild(p);
        container.appendChild(elem);
    }
}

async function join(mId) {
    try {
        let result = await requestJoinMatch(mId);
        if (!result.successful || result.err)
            throw result.err || { err: "Not successfull" }
        window.location.pathname = "/game.html"
    } catch (err) {
        console.log(err);
    //  alert("Something is not working");
    }
}

async function refresh() {
    try {
        result = await requestWaitingMatches();
        if (!result.successful || result.err)
            throw result.err || { err: "Not successfull" }
        // remove everything to fill again:
        let parent = document.getElementById("matches");
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
        fillMatches(result.matches);
    } catch (err) {
        console.log(err);
       // alert("Something went wrong!")
    }
}
async function createMatch() {
    try {
        let result = await requestCreateMatch();
        if (!result.successful || result.err)
            throw result.err || { err: "Not successfull" }
        window.location.pathname = "/waiting.html"
    } catch (err) {
        console.log(err);
      //  alert("Something is not working");
    }
}


async function logout() {
    try {
        let result = await requestLogout();
        if (!result.successful || result.err)
            throw result.err || { err: "Not successfull" }
        window.location.pathname = "/index.html"
    } catch (err) {
        console.log(err);
       // alert("Something is not working");
    }
}