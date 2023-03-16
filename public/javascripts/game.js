

window.onload = async function() {
    try {
        let result = await checkGame(true);
        if (result.err) throw result.err;
    } catch (err) {
        console.log(err);
    }
}

