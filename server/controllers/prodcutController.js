const Product = require("../model/Product");

const handleAddProduct = async (req, res) => {
  const { productName, cost, amountAvailable } = req.body;
  const sellerId = req.userId;
  if (!productName || !cost || !amountAvailable)
    return res
      .status(400)
      .json({ message: "productName, cost and amount are required" });
  const duplicate = await Product.findOne({ productName });
  if (duplicate) return res.sendStatus(409); // conflict
  try {
    const result = await Product.create({
      sellerId: sellerId,
      amountAvailable: amountAvailable,
      cost: cost,
      productName: productName,
    });
    console.log(result);
    res.status(201).json({
      success: `New Product ${productName} is added for seller ${sellerId}`,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
const handleUpdateProduct = async (req, res) => {
  const { productName, newProductName, newCost, newAmountAvailable } = req.body;
  const sellerId = req.userId;
  const foundProduct = await Product.findOne({ productName });
  if (!foundProduct) {
    return res.status(200).json({ message: "Product not found" }); // resource not found
  }
  if (foundProduct.sellerId !== sellerId) {
    return res.status(401).json({ message: "Unauthorized" }); // unauthorized
  }
  try {
  
    if (newProductName) {
      const duplicate = await Product.findOne({ productName: newProductName });
      if (duplicate) return res.status(409).json("Conflict");
      foundProduct.productName = newProductName;
    }
    if (newCost) foundProduct.cost = newCost;
    if (newAmountAvailable) foundProduct.amountAvailable = newAmountAvailable;
    const result = await foundProduct.save();
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something went wrong" });
  }
};
const handleDeleteProduct = async (req, res) => {
  const { productName } = req.body;
  const sellerId = req.userId;
  const foundProduct = await Product.findOne({ productName });
  if (!foundProduct) {
    return res.status(200).json({ message: "Prodcut Not found" }); // resource not found
  }
  if (foundProduct.sellerId !== sellerId) {
    return res.status(401).json({ message: "Unauthorized" }); // unauthorized
  }
  try {
    const result = await foundProduct.deleteOne();
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something went wrong" });
  }
};
const handleGetProducts = async (req, res) => {
  try {
    const products = await Product.find(
      {},
      "productName _id cost amountAvailable"
    );
    res.status(200).json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something went wrong" });
  }
};

module.exports = {
  handleAddProduct,
  handleUpdateProduct,
  handleDeleteProduct,
  handleGetProducts,
};
