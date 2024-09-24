const express = require("express");
const router = express.Router();
const products = require("../controllers/products");
//select * from products
router.get("/AllProducts",products.getProducts);
//insert into products
router.post("/AddProducts",products.addProducts);
//delete from products
router.post("/deleteProducts",products.deleteProducts);
//update products 
router.post("/updateProducts",products.updateProducts);
//select from where name = ""
router.get("/searchProducts/:nameProduct",products.searchProducts);
module.exports = router;