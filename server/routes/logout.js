const router = require("express").Router();
const authController = require("../controllers/authController");
router.delete("/", authController.handleLogout);
module.exports = router;
