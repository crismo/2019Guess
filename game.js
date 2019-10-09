const express = require('express');
const bodyParser = require('body-parser');
const languageSelector = require("./language");
const app = express();

const DEFAULT_PORT = 8000;

const MAX = 100;
const MIN = 1;

const HTTP_CODES = {
    NOT_FOUND: 404,
    OK: 200
};

const GAME_CODES = {
    ERROR: -1,
    OK: 2000,
    WIN: 2000,
    LOWER: 2010,
    BIGGER: 2020,
    OVER: 2030
};
//const LAN_KEY = "de";
/*const LAN_KEY =  {
    NOT_STARTED:"NOT_STARTED",
    WIN:"WIN",
    LOWER:"LOWER",
    BIGGER:"BIGGER",
    OVER:"OVER"
}
*/
let pickedNumber = null;
let isOngoing = false;

let uniqueUsers = [];

app.set('port', (process.env.PORT || DEFAULT_PORT));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(languageSelector());


app.get("/start/:user", function (req, response) {
    if (!isOngoing) {
        pickedNumber = Math.floor(Math.random() * (MAX - MIN)) + MIN;
        isOngoing = true;
        uniqueUsers = [req.params.user];
        console.log(uniqueUsers, "at user");
        console.log(pickedNumber);
    }
    response.json({code: HTTP_CODES.OK, min: MIN, max: MAX});
});

app.get ("/guess/:user/:number/:lan", function (req, res)  {


    let user = req.params.user;
    let lan = req.params.lan;
    console.log(lan);
    console.log(user, "atpost");
    if(uniqueUsers.indexOf(user) > -1){
        uniqueUsers.push(user);
    }

    let responseObj = {code: GAME_CODES.ERROR, msg: req.language(lan,"NOT_STARTED")};

    if (pickedNumber) {
        if (isOngoing) {
            let guess = parseInt(req.params.number);

            if (guess === pickedNumber) {
                isOngoing = false;
                responseObj = {code: GAME_CODES.WIN, msg: req.language(lan,"WIN")};
            } else if (guess < pickedNumber) {
                responseObj = {code: GAME_CODES.LOWER, msg: req.language(lan,"LOWER")};
            } else {
                responseObj = {code: GAME_CODES.BIGGER, msg: req.language(lan,"BIGGER")};
            }
        } else {
            responseObj = {code: GAME_CODES.OVER, msg: req.language(lan,"OVER")};
        }

        responseObj.users = uniqueUsers.length;
console.log(responseObj,"at great");
      // res.status(200).json(responseObj);
      res.json(responseObj);
    } else {
      console.log(responseObj, "failed");
        res.status(HTTP_CODES.NOT_FOUND).json(responseObj);
    }
});

app.listen(app.get('port'), function () {
    console.log('server running', app.get('port'));
});
