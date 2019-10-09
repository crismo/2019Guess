const ContentMaster = document.getElementById("ContentMaster");
let user = '';

function StartGame() {
    console.log('starting game');
    const nameInput = document.getElementById("userName");

    if(nameInput){
        const name = nameInput.value
        user = name;
        if(name.length > 0){
            fetch(`/start/${name}`).then(resp =>{
            if(resp.ok){
                resp.json().then(json => {
                    console.log(json);
                    const guessTitle = document.getElementById("guessTitle");
                    var temp = document.getElementById("GameScreen");
                    var clon = temp.content.cloneNode(true);
                    ContentMaster.innerHTML = "";
                    ContentMaster.appendChild(clon);
                    SetLanguage(language);
                });
            }});
        }
    }
}

//req.headers["accept-language"]

function MakeGuess() {
    const guessInput = document.getElementById("guess");
    const ServerResponseLabel = document.getElementById("ServerResponse");

    fetch(`/guess/${user}/${guessInput.value}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'accept-language': 'en'
        },
    }).then(response => {
        response.json().then(json => {
            console.log(json);
            ServerResponseLabel.innerText = json.msg;
        })
    });
}

function GetPrefeeredLanguage(){
    return navigator.languages ?
            navigator.languages[0] :
            (navigator.language || navigator.userLanguage)
}

var temp = document.getElementById("WelcomeScreen");
var clon = temp.content.cloneNode(true);
ContentMaster.appendChild(clon);