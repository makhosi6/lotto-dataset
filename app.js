const express = require("express");
const bodyParser = require("body-parser");
const wsChromeEndpointurl = require("./browser");
const cors = require("cors");
require("dotenv").config();
//
console.log("wsChromeEndpointurl :", wsChromeEndpointurl);
setTimeout(() => {
  const pb = require("./routes/powerball");
  const pbp = require("./routes/powerball_plus");
  //middleware
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());
  //
  let Routa = [pb, pbp];
  //   9090/api/v1/powerball"
  app.use("/api/v1/", Routa);
  const env = process.env.NODE_ENV || "development";
  const PORT = process.env.PORT || 9090;
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
