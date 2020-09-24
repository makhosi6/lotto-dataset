const vars = require("./storeVars");
const puppeteer = require("puppeteer");
const wsChromeEndpointurl = require("./browser");

class Scrapper {
    constructor(uri) {
        this.uri = uri;
    }

    async lotto() {
        try {
            let data = [];
            /*
                  REFACTOR, USE SETTERS....
                  */
            const browser = await puppeteer.connect({
                browserWSEndpoint: wsChromeEndpointurl,
            });

            const page = await browser.newPage();
            page.setUserAgent(vars.userAgent);
            await page.goto(this.uri, {
                waitUntil: "networkidle2",
                timeout: 0
            });
            await page.waitFor(12000);
            await page.waitForSelector(
                "#powerball-results > div.block > div.box > div > div.tableBody > div.tableRow "
            );
            const items = await page.$$(
                "#powerball-results > div.block > div.box > div > div.tableBody > div.tableRow "
            );

            for (const item of items) {
                try {
                    const draw_name = await item.$eval("a.blueLink", (a) => a.innerText);
                    const draw_date = await item.$eval(
                        ".col2 > .dataVal1",
                        (div) => div.innerText
                    );
                    const game_type = await item.$eval(
                        ".col3 > .dataVal1",
                        (div) => div.innerText
                    );
                    const bonus = await item.$eval(
                        ".col4 > .dataVal1 > .resultBalls > .ballsList.powerballExtra > .ball > .shape > span",
                        (span) => span.innerText
                    );

                    const numbers = await item.$$(
                        ".col4 > .dataVal1 > .resultBalls > .ballsList.powerball > .ball"
                    );
                   

                    let winning_numbers = [];
                  

                    for (const num of numbers) {
                        try {
                            const one_num = await num.$eval("div.shape > span", span => span.innerText);

                            winning_numbers.push(one_num);



                        } catch (error) {
                            console.log(
                                "\x1b[42m%s\x1b[0m",
                                `From ${uri} numbers loop: ${error.name}`
                            );
                        }
                    }
                    console.log({
                        draw_name,
                        draw_date,
                        game_type,
                        winning_numbers,
                        bonus


                    })
                    data.push({
                        draw_name,
                        draw_date,
                        game_type,
                        winning_numbers,
                        bonus

                    });
                } catch (error) {
                    console.log("\x1b[42m%s\x1b[0m", `From ${this.uri} loop: ${error}`);
                }
            }
            //
            await page.close();
            console.log("\x1b[43m%s\x1b[0m", `Done: ${this.uri}`);
            return data;
        } catch (error) {
            console.log("\x1b[41m%s\x1b[0m", `From ${this.uri} Main: ${error}`);
        }
    }
}

module.exports = {
    Scrapper: Scrapper
}