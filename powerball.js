const express = require("express");
const Routa =  express.Router();
( async()=>{
const Puppet = require("./Scrapper").Scrapper;


let params = {
    canvas: "https://makhosi6.github.io/template/",
    source : "https://www.nationallottery.co.za/powerball-history"

}

const powerball = new Puppet(params.source);
await powerball.lotto();

await (async()=> setTimeout(() => {
    console.log(101);
}, 10000))();
///Extract 




Routa.get('/powerball', (req, res) => {
    res.send({
        "97ENMCEC": powerball.items
    });
});


})();
module.exports = Routa;