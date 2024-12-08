const express = require("express");
const {
  allCampaign,
  myCampaign,
  editCampaign,
  addCampaign,
  deleteCampaign,
  signelCampaign,
  addDonation,
  myDonation,
  homeCampaign,
} = require("../controllers/campaign");
const route = express.Router();

route.get("/all", allCampaign);
route.get("/home", homeCampaign);
route.get("/:id", signelCampaign);
route.post("/me", myCampaign);
route.post("/update", editCampaign);
route.post("/add", addCampaign);
route.post("/donate", addDonation);
route.post("/donate/me", myDonation);
route.get("/remove/:id", deleteCampaign);

module.exports = route;
