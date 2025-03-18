// routes/apiRoutes.js
const express = require("express");
const router = express.Router();
const apiController = require("../controllers/apiController");

// Product

router.get("/products", apiController.getAllProducts);
router.get("/products/:id", apiController.getProductById);
router.post("/products", apiController.addProduct);
router.delete("/admin/delete/:id", apiController.deleteProduct);
router.put("/admin/update/:id", apiController.editProduct)

// Cart

router.post("/cart", apiController.addToCart);
router.get("/cart", apiController.getCart);

// User

router.get("/users", apiController.getUser);
router.get("/users/:id", apiController.getUserById);
router.post("/login", apiController.login);
router.post("/register", apiController.register);

// Brand

router.get("/categories", apiController.getAllBrands);
router.get("/categories/:id", apiController.getBrandById);
router.post("/categories", apiController.addBrand);
router.delete("/admin/deleteBrand/:id", apiController.deleteBrand);
router.put("/admin/updateBrand/:id", apiController.updateBrand);


module.exports = router;
