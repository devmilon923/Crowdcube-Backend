const Campaign = require("../model/campaign");
const DonationHistory = require("../model/donationHistory");
const allCampaign = async (req, res, next) => {
  try {
    const data = await Campaign.find({});
    res.status(200).json({
      status: true,
      data: data,
      message: "Data get success",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Unknown error",
    });
  }
};

const addCampaign = async (req, res) => {
  console.log(req.body);
  try {
   const data= await Campaign.create({
      campaign_title: req.body.title,
      campaign_type: req.body.campaign_type,
      description: req.body.description,
      min_donation_amount: req.body.min_donation,
      goal_amount: req.body.goal_amount,
      deadline: req.body.deadline,
      user_email: req.body.user_email,
      user_name: req.body.user_name,
      user_uid: req.body.user_uid,
      thumbnail: req.body.photoUrl,
    });
    res.status(200).send(data);
  } catch (error) {
    res.status(501).end();
  }
  //   res.send("working...");
};
const myCampaign = async (req, res) => {
  console.log(req.body.uid);
  // { uid: 'YzMMKdPuxKSIaNVrj4dGFCsSmef2' }
  try {
    const data = await Campaign.find({ user_uid: req.body.uid }).exec();
    if (data.length > 0) {
      return res.status(200).json({
        status: true,
        message: "Request success",
        data: data,
      });
    } else {
      return res.status(404).json({
        status: false,
        message: "No data found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Request failed",
    });
  }
};
const deleteCampaign = async (req, res) => {
  const id = req.params.id;
  try {
    await Campaign.findByIdAndDelete(id);
    return res.status(200).json({
      status: true,
      message: "Request success",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Request failed",
    });
  }
};
const editCampaign = async (req, res) => {
  const campaign_id = req.body.campaign_id;
  const data = {
    campaign_title: req.body.title,
    campaign_type: req.body.campaign_type,
    description: req.body.description,
    min_donation_amount: req.body.min_donation,
    goal_amount: req.body.goal_amount,
    deadline: req.body.deadline,
    user_email: req.body.user_email,
    user_name: req.body.user_name,
    user_uid: req.body.user_uid,
    thumbnail: req.body.photoUrl,
  };
  try {
    await Campaign.findByIdAndUpdate(campaign_id, data);
    return res.status(200).json({
      status: true,
      message: "Request success",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Request failed",
    });
  }
};
const signelCampaign = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Campaign.findById(id).exec();

    return res.status(200).json({
      status: true,
      message: "Request success",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Request failed",
    });
  }
};
const homeCampaign = async (req, res) => {
  try {
    const data = await Campaign.find({}).limit(6).exec();
    const activeData = data.filter(
      (campaign) => new Date(campaign.deadline) > new Date()
    );

    return res.status(200).json({
      status: true,
      message: "Request success",
      data: activeData,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Request failed",
    });
  }
};
const addDonation = async (req, res, next) => {
  // console.log(req.body);
  try {
    const addHistory = DonationHistory.create({
      campaign_id: req.body.campaign_id,
      campaign_title: req.body.campaign_title,
      campaign_type: req.body.campaign_type,
      donation_amount: req.body.amount,
      user_email: req.body.user_email,
      user_name: req.body.user_name,
      user_uid: req.body.user_uid,
      thumbnail: req.body.thumbnail,
      // thumbnail
    });
    const findCampaign = Campaign.findById(req.body.campaign_id);
    const [history, findCampaignResult] = await Promise.all([
      addHistory,
      findCampaign,
    ]);
    if (!findCampaignResult) {
      return res.status(404).json({ error: "No campaign found" });
    }

    const current_balance = findCampaignResult.current_balance;
    const donate_balance = parseInt(req.body.amount);
    const new_amount = current_balance + donate_balance;
    findCampaignResult.current_balance = new_amount;
    const newData = await findCampaignResult.save();

    res.status(200);
    res.send(newData);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.end();
  }
};
const myDonation = async (req, res) => {
  console.log(req.body.uid);
  try {
    const data = await DonationHistory.find({ user_uid: req.body.uid }).sort({
      createdAt: -1,
    });
    res.status(200).json({ message: "Hello", donations: data });
  } catch (error) {}
};
module.exports = {
  allCampaign,
  addCampaign,
  myCampaign,
  deleteCampaign,
  editCampaign,
  signelCampaign,
  addDonation,
  myDonation,
  homeCampaign,
};
