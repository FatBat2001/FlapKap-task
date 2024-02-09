const User = require("../model/User");
const validateCoins = require("../helper/validateCoins");
const handleDeposit = async (req, res) => {
  const coins = req.body.coins;
  if (!coins || !validateCoins(coins))
    return res.status(400).json({ message: "Insert coins properly" });
  try {
    let currentPayment = 0;
    Object.keys(coins).forEach((key) => {
      const factor = coins[key];
      const value = Number(key);
      currentPayment += value * factor;
    });
    const foundUser = await User.findOne({ _id: req.userId });
    foundUser.deposit += currentPayment;
    await foundUser.save();
    return res
      .status(200)
      .json({
        message: `Inserted Amount is ${currentPayment}, total: ${foundUser.deposit}`,
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something went wrong" });
  }
};

module.exports = { handleDeposit };
