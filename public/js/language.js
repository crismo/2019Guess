let language = 'en';

const TEXTS = {
    en: {
        WELCOME:"Welcome! Type your name to start the game!",
        GUESS:"Try guessing a number!"
    },
    no: {
        WELCOME:"Velkommen! Skriv inn navnet ditt for å starte spillet!",
        GUESS:"Prøv å gjette et tall!"
    },
    ro: {
        WELCOME:"Bine ati venit! Introdu numele tău pentru a începe jocul!",
        GUESS:"Încercați să ghiciți un număr!"
    },
    fr: {
        WELCOME:"Bienvenue! Tapez votre nom pour commencer le jeu!",
        GUESS:"Essayez de deviner un nombre!"
    },
    ar: {
        WELCOME:"أهلا بك! اكتب اسمك لبدء اللعبة!",
        GUESS:"حاول تخمين عدد!"
    },

      de: {
        WELCOME:"Welkom! Typ je naam om het spel te starten!",
        GUESS:"Probeer een nummer te raden!"
    },

    bg: {
        WELCOME:"Добре дошли! Въведете името си, за да започнете играта!",
        GUESS:"Опитайте да познаете число!"
    }
}

function GetString(language, KEY){
    let result = TEXTS[language][KEY];
    if(result){
        return result;
    } else {
        return 'Ups! Seems like there is a hole in our language system 🙈'
    }
}

function SetLanguage(langcode) {
    language = langcode;
    welcomeTitle.innerText = GetString(langcode, "WELCOME");
    guessTitle.innerText = GetString(langcode, "GUESS");
}