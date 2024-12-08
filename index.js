const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const campaignRoute = require("./routes/campaignRoute");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());
mongoose
  .connect(process.env.MONGODBURI)
  .then(() => console.log("Database active now"))
  .catch((err) => console.log(err));

app.use("/campaign", campaignRoute);
app.listen(process.env.PORT || 5000, () =>
  console.log(`Yahhh i am in on port ${process.env.PORT}`)
);
