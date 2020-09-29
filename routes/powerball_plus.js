const express = require("express");
const Routa = express.Router();
const Puppet = require("../store/Scrapper").Scrapper;
const csvWriter = require('../store/write');

let source = "https://www.nationallottery.co.za/powerball-plus-history";

const powerball = new Puppet(source);
powerball.lotto().then(() => {
    csvWriter.writeRecords(powerball.record).then(() => {
        console.log('.csv file created @ ', require('path').basename(__filename));
    })
});

Routa.get('/powerball-plus', (req, res) => {
    res.send({
        "type": "POWERBALL PLUS",
        source,
        "data": powerball.data
    });
});

module.exports = Routa;

//mailto:?subject=Trump%E2%80%99s%20Massive%20Hairstyling%20Bill%20Revealed%20In%20NYT%20Bombshell%20Tax%20Report&amp;body=Article: https://www.huffpost.com/entry/donald-trump-hair-cost_n_5f714792c5b64deddeefae00