const User = require("../model/User");

const handleReset = async (req, res) => {
  try {
    const foundUser = await User.findOne({ _id: req.userId });
    foundUser.deposit = 0;
    await foundUser.save();
    return res.status(200).json({ message: `Reset Successfull` });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something went wrong" });
  }
};

module.exports = { handleReset };
