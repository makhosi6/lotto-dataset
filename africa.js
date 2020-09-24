const puppeteer = require("puppeteer");
require('dotenv').config();
const wsChromeEndpointurl = require('../browser');
const vars = require('../store/storeVars');
const express = require("express");
const Routa = express.Router();
///
// process.setMaxListeners(Infinity);
//
let data = [];
async function main(uri) {
    try {
        const browser = await puppeteer.connect({
            browserWSEndpoint: wsChromeEndpointurl,
        });
        const page = await browser.newPage();
        page.setUserAgent(vars.userAgent);
        await page.goto(uri, { waitUntil: 'networkidle2', timeout: 0 });
        await page.waitFor(125000);
        await page.waitForSelector('article');
        const items = await page.$$('article.just-in__article');

        for (const item of items) {
            try {
                const time = await each.$('time');
                const ab = await each.$('a');
                const date = (time != null || undefined) ? await page.evaluate(i => i.textContent, time) : null;
                //
                const headline = await each.$eval('h3 > a', a => a.innerText);
                //
                const link = await page.evaluate(a => a.href, ab);
                data.push({
                    /* 
                    
                    
                    */
  
                  })
            } catch (error) {
                console.log('\x1b[42m%s\x1b[0m', `From ${uri} loop: ${error.name}`)

            }
        }
        //
        await page.close();
        console.log('\x1b[43m%s\x1b[0m', `Done: ${uri}`);

    } catch (error) {
        console.log('\x1b[41m%s\x1b[0m', `From ${uri} Main: ${error}`);
    }
}
let source = "https://www.africanews.com/";

main(source);
Routa.get('/africa', (req, res) => {
    res.send({

        news,
        trending

    });
});
module.exports = Routa;