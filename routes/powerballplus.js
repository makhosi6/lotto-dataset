const express = require("express");
const Routa =  express.Router();
const Puppet = require("../store/Scrapper").Scrapper;

let source = "https://www.nationallottery.co.za/powerball-plus-history";

const powerball = new Puppet(source);
powerball.lotto();

Routa.get('/powerball-plus', (req, res) => {
    res.send({
        "type": "POWERBALL PLUS",
        source,
        "data": powerball.data
    });
});

module.exports = Routa;