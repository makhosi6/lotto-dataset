const vars = require("./storeVars");
const puppeteer = require("puppeteer");
const wsChromeEndpointurl = require("./browser");
const extract = require('./extract').results;


class Scrapper {
  constructor(uri) {
    this.uri = uri;
    this.data = "";
    this.items = [];
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
        document.querySelector('input[name="fromDate"]').value = "17/06/2020";
        document.querySelector('input[name="toDate"]').value = "26/09/2020";
      });
      //click
      await page.$eval(".btn_search", (elem) => elem.click());
      await page.waitFor(12000);

      do {
        console.log("nxt inside the loop:", nxt);
        //srapp
        const items = await page.evaluate(
          () =>
          document.querySelector(
            "#powerball-results > div.block > div.box > div > div.tableBody"
          ).innerHTML
        );
        //feed
        this.data += items;
        //next_page
        await page.$eval("#next > a", (elem) => elem.click());
        await page.waitFor(3000);
        //check
        nxt = await page.evaluate(() => {
          let x = document.querySelector("#next.disabled");
          return ((x == null) ? {} : null);
        });
      } while (nxt != null);
      //
      await page.close();
//HELPER
let canvas = "https://makhosi6.github.io/template/";
console.log(this.data,"\n\n\nprince");
const data = await extract(canvas,this.data);
this.items = data

      console.log("\x1b[43m%s\x1b[0m", `Done: ${this.uri}`);
    } catch (error) {
      console.log("\x1b[41m%s\x1b[0m", `From ${this.uri} Main: ${error}`);
    }
  }
}

module.exports = {
  Scrapper: Scrapper,
};