const router = require("express").Router();
const depositController = require("../controllers/depositController");
const ROLES_LIST = require("../config/roles_list");
const verifyJWT = require("../middleware/verifyJWT");
const verifyRoles = require("../middleware/verifyRoles");
router.use(verifyJWT);
router.post(
  "/",
  verifyRoles(ROLES_LIST.Buyer),
  depositController.handleDeposit
);

module.exports = router;
