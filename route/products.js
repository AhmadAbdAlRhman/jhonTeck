const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const products = require("../controllers/products");
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const fileType = file.mimetype;
      if (fileType.includes("image")) {
        cb(null, "./public/images");
      } else if (fileType.includes("pdf")) {
        cb(null, "./public/Document");
      }
    },
    filename: (req, file, cb) => {
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  }),
}).fields([
  { name: "image", maxCount: 1 }, // Handle single image upload
  { name: "pdf", maxCount: 1 }, // Handle single PDF upload
]);
//select * from products
router.get("/AllProducts", products.getProducts);
//insert into products
router.post(
  "/AddProducts",
    upload,
    products.addProducts
);
//delete from products
router.post("/deleteProducts", products.deleteProducts);
//update products
router.post("/updateProducts", upload, products.updateProducts);
//select from where name = ""
router.get("/searchProducts/:nameProduct", products.searchProducts);
//select from product where id = ""
router.get("/product",products.getOneProduct);
module.exports = router;
