const express = require("express");
const Routa = express.Router();
const Puppet = require("../store/Scrapper").Scrapper;
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvWriter = createCsvWriter({
    path: `__csv_files__/__powerball__.csv`,
    header: [{
            id: 'date',
            title: 'DATE'
        },
        {
            id: 'ball_one',
            title: 'BALL ONE'
        },
        {
            id: 'ball_two',
            title: 'BALL TWO'
        },
        {
            id: 'ball_three',
            title: 'BALL THREE'
        },
        {
            id: 'ball_four',
            title: 'BALL FOUR'
        },
        {
            id: 'ball_five',
            title: 'BALL FIVE'
        },
        {
            id: 'bonus',
            title: 'BONUS'
        },
    ]
});


let source = "https://www.nationallottery.co.za/powerball-history";

const powerball = new Puppet(source);

powerball.lotto().then(() => {
csvWriter.writeRecords(powerball.record)

    .then(() => {
        console.log('.csv file created from powerball.js');
    });
});

Routa.get('/powerball', (req, res) => {
    res.send({
        "type": "POWERBALL",
        source,
        "data": powerball.data
    });
});

module.exports = Routa;