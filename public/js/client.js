import {getText} from "./language.js";

const LAN_KEY = {
    TITLE: "TITLE",
    GUESS: "GUESS",
    YOUR_GUESS: "YOUR_GUESS",
    USER_NAME: "USER_NAME",
    START_JOIN: "START_JOIN",
    PLAYERS_PLAYING: "PLAYERS_PLAYING"
};

const nameInput = document.getElementById("userName");
const guessInput = document.getElementById("guess");
const userLang = navigator.language || navigator.userLanguage;

let guessBtn = document.getElementById("btn1");
let startBtn = document.getElementById("btn2");
let output = document.getElementById("output");
let nbPlayers = document.getElementById("nbPlayers");

language();

function language() {
    let title = document.getElementById("title");
    let usernameLabel = document.getElementById("userNameLabel");
    let guessLabel = document.getElementById("guessLabel");

    title.innerText = getText(LAN_KEY.TITLE, userLang);
    usernameLabel.innerText = getText(LAN_KEY.USER_NAME, userLang);
    guessLabel.innerText = getText(LAN_KEY.YOUR_GUESS, userLang);
    startBtn.innerText = getText(LAN_KEY.START_JOIN, userLang);
    guessBtn.innerText = getText(LAN_KEY.GUESS, userLang);
}

function checkNameInput(name) {
    let regex = RegExp("^[a-zA-Z0-9]*$");

    if (name.length > 0 && regex.test(name)) {
        nameInput.style.borderColor = "#ddd";
        return true;
    } else {
        nameInput.style.borderColor = "red";
        return false;
    }
}

function checkGuessInput(guess) {
    if (guess) {
        guessInput.style.borderColor = "#ddd";
        return true;
    } else {
        guessInput.style.borderColor = "red";
        return false;
    }
}

async function requestToServer(path, content) {
    return fetch(path, content).then(resp => {
        console.log(resp);
        if (resp.ok) {
            return resp.json();
        }
    });
}

if (startBtn) {
    startBtn.addEventListener('click', (evt) => {
        if (nameInput) {
            const name = nameInput.value;

            if (checkNameInput(name)) {
                guessBtn.disabled = false;

                requestToServer(`/start/${name}`, {}).then(json => {
                    console.log(json);
                    guessInput.min = json.min;
                    guessInput.max = json.max;
                    nbPlayers.innerText = json.users + " " + getText(LAN_KEY.PLAYERS_PLAYING, userLang);
                });
            }
        }
    });
}

if (guessBtn) {
    guessBtn.addEventListener('click', (evt) => {
        if (nameInput && guessInput) {
            const name = nameInput.value;
            const guess = guessInput.value;

            if (checkNameInput(name) && checkGuessInput(guess)) {
                requestToServer(`/guess/${name}/${guess}`, {
                    method: "POST",
                    headers: {
                        "accept": "application/json",
                        "content-type": "application/json",
                        "accept-language": userLang
                    }
                }).then(json => {
                    console.log(json);
                    output.innerText = json.msg;
                    nbPlayers.innerText = json.users + " " + getText(LAN_KEY.PLAYERS_PLAYING, userLang);
                });
            }
        }
    });
}
