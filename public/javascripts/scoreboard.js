window.onload = async function() {
    let result = await requestScores();
    if (!result.successful || result.err) {
        alert("Something wrong. Going to login page");
        window.location.pathname = "/index.html"
    }
    fillScores(result.scores);
}



function fillScores(scores) {
    let container = document.getElementById("scores");
    for (let score of scores) {
        let elem = document.createElement("section");
        let t = document.createElement("table");
        elem.appendChild(t);
        let tr = document.createElement("tr");
        t.appendChild(tr); 
        let td = document.createElement("td");
        t.appendChild(td); 
        td.colSpan = 3;
        td.style.textAlign = "center";
        td.style.borderBottom = "2px solid black";
        td.textContent = "Game "+score.gameId;
        for (let player of score.playerScores) {
            let tr = document.createElement("tr");
            t.appendChild(tr);
            let td = document.createElement("td");
            td.textContent = player.name;
            tr.appendChild(td);
            td = document.createElement("td");
            td.textContent = player.state;
            tr.appendChild(td);
            td = document.createElement("td");
            td.textContent = "Points: "+player.points;
            tr.appendChild(td);
        }
        container.appendChild(elem);
    }
}