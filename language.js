module.exports = function() {
  //i18n l10n
  const DEFAULT_LANGUAGE = "en";

  const TEXTS = {
    en: {
      START_STATEMENT: "Guess a number beweeen 1 and 100.",
      NOT_STARTED: "Game not started. Go to /start",
      WIN: "You guessed correctly ! Game over.",
      LOWER: "The number is bigger, try again!",
      BIGGER: "The number is lower, try again!",
      OVER: "The game is already over, too bad."
    },
    no: {
      START_STATEMENT: "Gjett et tall mellom 1 og 100.",
      NOT_STARTED: "Ikke noe pågående spill. Gå til /start",
      WIN: "Du gjettet riktig! Game over.",
      LOWER: "Tallet er større, prøv på nytt!",
      BIGGER: "Tallet er mindre, prøv på nytt!",
      OVER: "Spillet er allerede over."
    },
    ro: {
      START_STATEMENT: "Devinez la numărul 1 și 100.",
      NOT_STARTED: "Jocul nu a început. Mergi la /start",
      WIN: "Corect! Jocul s-a terminat",
      LOWER: "Numărul este mai mare, încearcă din nou!",
      BIGGER: "Numărul este mai mic, încearcă din nou!",
      OVER: "Jocul s-a terminat deja."
    },
    fr: {
      START_STATEMENT: "Devinez un nombre entre 1 et 100.",
      NOT_STARTED: "La partie n'a pas commence. Allez a /start",
      WIN: "Vous avez deviné correctement! Fin de la partie.",
      LOWER: "Le nombre est plus grand, reessaie!",
      BIGGER: "Le nombre est plus petit, reessaie!",
      OVER: "La partie est deja terminee, dommage."
    },
    ar: {
      START_STATEMENT: "تخمين عدد بين 1 و 100.",
      NOT_STARTED: "/start لم تبدا اللعبه, اذهب الى",
      WIN: ".لقد حزرت الرقم الصحيح. انتهت اللعبه",
      LOWER: "!الرقم اكبر, حاول مره ثانيه",
      BIGGER: "!الرقم اصغر, حاول مره ثانيه",
      OVER: ".انتهت اللعبه, للاسف"
    },

      de: {
      START_STATEMENT: "Errate eine Zahl zwischen 1 und 100.",
      NOT_STARTED: "Das Spiel hat noch nicht begonnen. Gehe zu /start",
      WIN:"Richtig geraten! Das Spiel ist beendet.",
      LOWER:"Die Zahl ist grösser, versuche noch einmal!",
      BIGGER:"Die Zahl ist kleiner, versuche noch einmal",
      OVER:"Das Spiel ist schon beendet."
    },

    bg: {
      START_STATEMENT: "Познайте число между 1 и 100.",
      NOT_STARTED: "Играта не е започнала. Отиди до /start",
      WIN: "Ти позна правилния отговор! Край на играта.",
      LOWER: "Числото е по-голямо, опитай пак!",
      BIGGER: "Числото е по-малко, опитай пак!",
      OVER: "Играта вече приключи, жалко."
    },
    sa:{
      NOT_STARTED:"Speallu ii leat álgán. Mana /start.",
      WIN: "Don leat árvidan riekta! Speallu lea geargan.",
      LOWER:"Du lohku lea stoarrát, geahčal oktii vel!",
      BIGGER:"Du lohku lea unnit, geahčal oktii vel!",
      OVER:"Speallu lea geargan!"
    }


};


return function getClientLang(req, res, next) {
  let language = req.headers["accept-language"] || DEFAULT_LANGUAGE;
  language = language.split(/[, -]/)[0].split(";")[0]; //["fr;q0.9", "en;0.8"] --> ["fr","q09"]
  let languages = Object.keys(TEXTS); // ["en","no"]
  if(language === "nb" || "nb-no"){
    language = "no";
  }
  if (languages.indexOf(language) < 0) {
      language = DEFAULT_LANGUAGE;
  }

  //------
  req.language = function (key) {
      let value = TEXTS[language][key];
      if (!value) {
          value = TEXTS[DEFAULT_LANGUAGE][key];
          console.error(
              `Person that wrote the ${language} made a mistake with key ${key}`
          );
      }

      return value;
  };
    //------

    next();
  };
};
