const express = require("express");
const puppet = require("./Scrapper");
const Routa = express.Router();

let source = "https://www.nationallottery.co.za/powerball-history";

const Puppet = puppet.Scrapper;
const powerball = new Puppet(source);

powerball.lotto();

Routa.get('/powerball', (req, res) => {
    res.send({
        "97ENMCEC": powerball.data

    });
});
module.exports = Routa;