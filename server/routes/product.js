const productController = require("../controllers/prodcutController");
const ROLES_LIST = require("../config/roles_list");
const verifyRoles = require("../middleware/verifyRoles");
const verifyJWT = require("../middleware/verifyJWT");
const router = require("express").Router();

router.get("/", productController.handleGetProducts);
router.use(verifyJWT);
router.post(
  "/",
  verifyRoles(ROLES_LIST.Seller),
  productController.handleAddProduct
);
router.put(
  "/",
  verifyRoles(ROLES_LIST.Seller),
  productController.handleUpdateProduct
);
router.delete(
  "/",
  verifyRoles(ROLES_LIST.Seller),
  productController.handleDeleteProduct
);
module.exports = router;
