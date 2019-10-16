const DEFAULT_LANGUAGE = "en-US";

const TEXTS = {
    "en-US": {
        TITLE: "Guess my number!",
        GUESS: "Guess",
        YOUR_GUESS: "Your guess",
        USER_NAME: "Username",
        START_JOIN: "Start / Join",
        PLAYERS_PLAYING: "player(s) playing"
    },
    "fr-FR": {
        TITLE: "Devine mon nombre!",
        GUESS: "Deviner",
        YOUR_GUESS: "Votre choix",
        USER_NAME: "Nom d'utilisateur",
        START_JOIN: "Commencer / Rejoindre",
        PLAYERS_PLAYING: "Joueur(s) en train de jouer"
    }
};

function getText(key, language) {
    let value = TEXTS[language][key];
    if (!value) {
        value = TEXTS[DEFAULT_LANGUAGE][key];
        console.error(
            `Person that wrote the ${language} made a mistake with key ${key}`
        );
    }

    return value;
}

export {getText};