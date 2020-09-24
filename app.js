const express = require("express");
const bodyParser = require("body-parser");
const wsChromeEndpointurl = require("./browser");
const cors = require("cors");
require("dotenv").config();
//
setTimeout(() => {
  console.log("wsChromeEndpointurl :", wsChromeEndpointurl);
  const pb = require("./powerball");
  //middleware
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());
  //
  let Routa = [pb];
  //9090/api/v1/powerball"
  app.use("/api/v1/", Routa);
  const env = process.env.NODE_ENV;
  const PORT = process.env.PORT;
  //Fiv nat-geo uri
  app.listen(
    PORT,
    console.log(
      "\x1b[45m%s\x1b[0m",
      `Running in ${env} mode on port ${PORT}. And ${
        Routa.length
      } routes went live on ${Date()}`
    )
  );
}, 30000);
