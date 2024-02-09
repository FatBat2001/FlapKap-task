const Product = require("../model/Product");
const User = require("../model/User");
const calculateChange = require("../helper/calculateChange");
const handleBuyProcess = async (req, res) => {
  const userId = req.userId;
  const { amount, productId } = req.body;
  if (!amount || !productId)
    return res
      .status(400)
      .json({ message: "amount and productId are required" });
  if (Number(amount) !== amount)
    return res.status(400).json({ message: "Amount is an Integer field" });
  try {
    const foundProduct = await Product.findOne({ _id: productId });
    const foundUser = await User.findOne({ _id: userId });

    if (!foundProduct)
      return res
        .status(404)
        .json({ message: `No product found with id: ${productId}` });

    if (foundProduct.amountAvailable < amount)
      return res.status(400).json({ message: "Insfuficient prodcuts" });

    const totalCost = foundProduct.cost * amount;
    if (totalCost > foundUser.deposit)
      return res.status(400).json({ message: "Insufficient Funds" });

    const remainig = foundUser.deposit - totalCost;
    foundProduct.amountAvailable -= amount;
    foundUser.deposit -= totalCost;
    await foundProduct.save();
    await foundUser.save();
    const change = calculateChange(remainig);
    res
      .status(200)
      .json({
        totalSpent: totalCost,
        change: change,
        purchased: foundProduct.productName,
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something went wrong" });
  }
};

module.exports = { handleBuyProcess };
