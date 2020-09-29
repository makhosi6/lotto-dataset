const express = require("express");
const Routa = express.Router();
const Puppet = require("../store/Scrapper").Scrapper;
const csvWriter = require('../store/write')

let source = "https://www.nationallottery.co.za/powerball-history";

const powerball = new Puppet(source);

powerball.lotto().then(() => {
    csvWriter.writeRecords(powerball.record).then(() => {
        console.log('.csv file created @ ', require('path').basename(__filename));
    })
});

Routa.get('/powerball', (req, res) => {
    res.send({
        "type": "POWERBALL",
        source,
        "data": powerball.data
    });
});

module.exports = Routa;