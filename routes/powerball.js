const express = require("express");
const Routa =  express.Router();
const Puppet = require("../store/Scrapper").Scrapper;

let source = "https://www.nationallottery.co.za/powerball-history";

const powerball = new Puppet(source);
powerball.lotto();

Routa.get('/powerball', (req, res) => {
    res.send({
        "97ENMCEC": powerball.data
    });
});

module.exports = Routa;