const vars = require("./storeVars");
const puppeteer = require("puppeteer");
const wsChromeEndpointurl = require("./browser");

async function results(uri, loadedHtml) {
  try {
    let data = [];
    const browser = await puppeteer.connect({
      browserWSEndpoint: wsChromeEndpointurl,
    });
    console.log(0,loadedHtml);
    const page = await browser.newPage();
    await page.setViewport({
      width: 1390,
      height: 969,
    });
    page.setUserAgent(vars.userAgent);
    await page.goto(uri, {
      waitUntil: "networkidle2",
      timeout: 0,
    });
    await page.waitForSelector("div.content");
    await page.evaluate((_) => {
      // this will be executed within the page, that was loaded before
      document.querySelector("div.content").innerHTML += loadedHtml;
    });
    await page.waitFor(12000);
    const items = await page.$$("div.tableRow");

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
        data.push({
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
    await page.close();
    console.log("\x1b[43m%s\x1b[0m", `Done: ${uri}`);
    return data;
  } catch (error) {
    console.trace("\x1b[42m%s\x1b[0m", `From ${uri} Main: ${error}`);
  }
}

module.exports = {
  results,
};
