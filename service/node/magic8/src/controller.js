import boom from "@hapi/boom";


import logger from "./logger.js";
import { predictschema, validate } from "./validator.js";

//Prediction Outcomes
let predictionoutcomes = [
    {
        result: "It is certain.",
        outcome: 1
    },
    {
        result: "It is decidedly so.",
        outcome: 1
    },
    {
        result: "Without a doubt.",
        outcome: 1
    },
    {
        result: "Yes – definitely.",
        outcome: 1
    },
    {
        result: "You may rely on it.",
        outcome: 1
    },
    {
        result: "As I see it, yes.",
        outcome: 1
    },
    {
        result: "Most likely.",
        outcome: 1
    },
    {
        result: "Outlook good.",
        outcome: 1
    },
    {
        result: "Yes.",
        outcome: 1
    },
    {
        result: "Signs point to yes.",
        outcome: 1
    },
    {
        result: "Reply hazy, try again.",
        outcome: -1
    },
    {
        result: "Ask again later.",
        outcome: -1
    },
    {
        result: "Better not tell you now.",
        outcome: -1
    },
    {
        result: "Cannot predict now.",
        outcome: -1
    },
    {
        result: "Concentrate and ask again.",
        outcome: -1
    },
    {
        result: "Don't count on it.",
        outcome: 0
    },
    {
        result: "My reply is no.",
        outcome: 0
    },
    {
        result: "My sources say no.",
        outcome: 0
    },
    {
        result: "Outlook not so good.",
        outcome: 0
    },
    {
        result: "Very doubtful.",
        outcome: 0
    },
];

let randomNumberList = [];
(() => {
    while (randomNumberList.length < predictionoutcomes.length) {
        let randomNumber = (Math.floor(Math.random() * ((predictionoutcomes.length - 1) - 0 + 1)) + 0);
        if (!randomNumberList.includes(randomNumber)) {
            randomNumberList.push(randomNumber);
        }
    }
})();

let shuffle = (arr) => {
    let currentIndex = arr.length;
    let temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = arr[currentIndex];
        arr[currentIndex] = arr[randomIndex];
        arr[randomIndex] = temporaryValue;
    }
    return arr;
};

export const prediction = async (req, res, next) => {
    try {
        logger.debug("Start Prediction Start for " + req.url + " ]");

        logger.debug("Calling Validate ");
        let result = validate(req.body, predictschema);
        logger.debug("Done Calling Validate got result " + result);

        if (result.error) {
            logger.debug("Validate failed retunring bad request error ");
            return next(boom.badRequest(result.error));
        }

        logger.debug("STATEMENT: " + req.body.statement + " ");

        let resultpayload = {
            statement: req.body.statement,
            result: "",
            outcome: null
        };

        logger.debug("Calling Random ");
        let randomNumberListShuffle = shuffle(randomNumberList.slice());
        let prediction = shuffle(predictionoutcomes.slice())[randomNumberListShuffle[Math.floor(Math.random() * ((predictionoutcomes.length - 1) - 0 + 1)) + 0]];
        resultpayload.result = prediction.result;
        resultpayload.outcome = prediction.outcome;
        logger.debug("Done Calling Random ");

        logger.debug("Prediction End for " + req.url);
        res.status(200).json(resultpayload);
    } catch (err) {
        logger.error("Got error processing prediction error: " + err);
        next(boom.badImplementation(err));
    }
};