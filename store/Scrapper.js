const vars = require("./storeVars");
const puppeteer = require("puppeteer");
const wsChromeEndpointurl = require("../browser");

class Scrapper {
  constructor(uri) {
    this.uri = uri;
    this.data = [];
    this.record = [];
  }

  async lotto() {
    try {
      const browser = await puppeteer.connect({
        browserWSEndpoint: wsChromeEndpointurl,
      });
      const page = await browser.newPage();
      await page.setViewport({
        width: 1390,
        height: 969,
      });
      page.setUserAgent(vars.userAgent);
      await page.goto(this.uri, {
        waitUntil: "networkidle2",
        timeout: 0,
      });
      await page.waitForSelector(
        "#powerball-results > div.block > div.box > div > div.tableBody > div.tableRow "
      );
      let nxt = {};
      await page.evaluate((_) => {
        // this will be executed within the page, that was loaded before
        document.querySelector('input[name="fromDate"]').value = "17/06/2017"; //date sort by js
        document.querySelector('input[name="toDate"]').value = "29/09/2020";
      });
      //click
      await page.$eval(".btn_search", (elem) => elem.click());
      await page.waitFor(5000);
      let num = 1;
      do {
        num++;
        const items = await page.$$(
          "#powerball-results > div.block > div.box > div > div.tableBody > div.tableRow"
        );
        for (const item of items) {
          try {
            const draw_name = await item.$eval(
              "a.blueLink",
              (a) => a.innerText
            );
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
              (span) => Number(span.innerText)
            );
            const numbers = await item.$$(
              ".col4 > .dataVal1 > .resultBalls > .ballsList.powerball > .ball"
            );
            let winning_numbers = [];
            for (const num of numbers) {
              try {
                const one_num = await num.$eval("div.shape > span", (span) =>
                  Number(span.innerText)
                );
                winning_numbers.push(one_num);
              } catch (error) {
                console.log(
                  "\x1b[42m%s\x1b[0m",
                  `From ${uri} numbers loop: ${error}`
                );
              }
            }
            //
            const list = await item.$(
              ".col4 > .dataVal1 > .resultBalls > .ballsList.powerball"
            );
            const ball_one = await list.$eval("li:nth-child(1)", (div) =>
              Number(div.innerText)
            );
            const ball_two = await list.$eval("li:nth-child(2)", (div) =>
              Number(div.innerText)
            );
            const ball_three = await list.$eval("li:nth-child(3)", (div) =>
              Number(div.innerText)
            );
            const ball_four = await list.$eval("li:nth-child(4)", (div) =>
              Number(div.innerText)
            );
            const ball_five = await list.$eval("li:nth-child(5)", (div) =>
              Number(div.innerText)
            );

            this.record.push({
              date: draw_date,
              ball_one,
              ball_two,
              ball_three,
              ball_four,
              ball_five,
              bonus,
            });

            this.data.push({
              draw_name,
              draw_date,
              game_type,
              winning_numbers,
              bonus,
            });
          } catch (error) {
            console.trace("\x1b[42m%s\x1b[0m", `From ${uri} loop: ${error}`);
          }
        }
        //next_page
        await page.$eval("#next > a", (elem) => elem.click());
        await page.waitFor(3000);
        //check
        nxt = await page.evaluate(() => {
          let x = document.querySelector("#next.disabled");
          return x == null ? {} : null;
        });
      } while (nxt != null);

      console.log("\x1b[37m%s\x1b[0m", `\n${num} pages from ${this.uri}\n`);
      //
      await page.close();

      console.log("\x1b[43m%s\x1b[0m", `Done: ${this.uri}`);
    } catch (error) {
      console.log("\x1b[41m%s\x1b[0m", `From ${this.uri} Main: ${error}`);
    }
  }
}

module.exports = {
  Scrapper: Scrapper,
};