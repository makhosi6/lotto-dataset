const express = require("express");
const puppet = require("./Scrapper");
const Routa = express.Router();

let source = "https://www.nationallottery.co.za/powerball-history";

const Puppet = puppet.Scrapper;
const data = new Puppet(source);

Routa.get('/powerball', (req, res) => {
    res.send({
        "97ENMCEC": data.lotto()

    });
});
module.exports = Routa;