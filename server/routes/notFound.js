const router = require("express").Router();
router.all("*", async (req, res) => {
  return res.status(404).json({ message: "404 Not Found" });
});
module.exports = router;
