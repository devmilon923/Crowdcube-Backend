const mongoose = require("mongoose");

const donationHistorySchema = mongoose.Schema(
  {
    campaign_title: {
      type: String,
      required: true,
    },
    campaign_id: {
      type: String,
      required: true,
    },
    campaign_type: {
      type: String,
      required: true,
    },

    donation_amount: {
      type: Number,
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

const DonationHistory = mongoose.model(
  "donationHistory",
  donationHistorySchema
);

module.exports = DonationHistory;
