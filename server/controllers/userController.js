const User = require("../model/User");
const handleGetAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "username roles deposit");
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "smoething went wrong" });
  }
};

module.exports = { handleGetAllUsers };
