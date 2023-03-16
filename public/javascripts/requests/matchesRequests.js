async function requestPlayerGame() {
    try {
        const response = await fetch(`/api/games/auth`);
        let result = await response.json();
        return { successful: response.status == 200,
                 unauthenticated: response.status == 401,
                 game: result};
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
        return {err: err};
    }
}

async function requestWaitingMatches() {
    try {
        const response = await fetch(`/api/games/`);
        var result = await response.json();
        return {successful: response.status == 200, 
                unauthenticated: response.status == 401,
                matches: result};
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
        return {err: err};
    }
}




async function requestJoinMatch(mId) {
    try {
        const response = await fetch(`/api/games/${mId}/join`, 
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
          method: "PATCH"
      });
        return {successful: response.status == 200};
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
        return {err: err};
    }
}

async function requestCreateMatch() {
    try {
        const response = await fetch(`/api/games/`, 
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
          method: "POST"
        });
        return {successful: response.status == 200};
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
        return {err: err};
    }
}


async function requestCancelMatch() {
    try {
        const response = await fetch(`/api/games/auth/cancel`, 
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
          method: "PATCH"
        });
        return {successful: response.status == 200};
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
        return {err: err};
    }
}


async function requestScores() {
    try {
        const response = await fetch(`/api/scores/`);
        var result = await response.json();
        return {successful: response.status == 200, 
                scores: result};
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
        return {err: err};
    }
}


async function requestScore() {
    try {
        const response = await fetch(`/api/scores/auth`);
        var result = await response.json();
        return {successful: response.status == 200, 
                unauthenticated: response.status == 401,
                score: result};
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
        return {err: err};
    }
}

