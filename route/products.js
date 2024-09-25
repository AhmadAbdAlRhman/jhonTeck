const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const products = require("../controllers/products");
const FILE_TYPE_MAM = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
  "image/svg": "svg",
  "image/apng": "apng",
  "image/avif": "avif",
  "image/webp": "webp",
};
// Merge image and PDF uploads using upload.fields()
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const isValid = FILE_TYPE_MAM[file.mimetype];
      if (isValid) {
        cb(null, "./public/images"); // Store images in /public/images
      } else if (file.mimetype === "application/pdf") {
        cb(null, "./public/Document"); // Store PDFs in /public/documents
      } else {
        cb(new Error("Invalid file type"), false);
      }
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
});
//select * from products
router.get("/AllProducts", products.getProducts);
//insert into products
router.post(
  "/AddProducts",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
  ]),
  products.addProducts
);

//delete from products
router.post("/deleteProducts", products.deleteProducts);
//update products
router.post(
  "/updateProducts",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
  ]),
  products.updateProducts
);
//select from where name = ""
router.get("/searchProducts/:nameProduct", products.searchProducts);
//select from product where id = ""
router.get("/product", products.getOneProduct);
module.exports = router;
