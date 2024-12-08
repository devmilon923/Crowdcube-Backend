const mongoose = require("mongoose");

const campaignSchema = mongoose.Schema(
  {
    campaign_title: {
      type: String,
      required: true,
    },
    campaign_type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    min_donation_amount: {
      type: Number,
      required: true,
    },
    goal_amount: {
      type: Number,
      required: true,
    },
    current_balance: {
      type: Number,
      required: true,
      default: 0,
    },
    deadline: {
      type: Date,
      required: true,
    },
    user_email: {
      type: String,
      required: true,
    },
    user_name: {
      type: String,
      required: true,
    },
    user_uid: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Campaign = mongoose.model("campaign", campaignSchema);

module.exports = Campaign;
