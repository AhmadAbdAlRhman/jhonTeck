const express = require("express");
const path = require("path");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
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
      const ext = path.extname(file.originalname);
      cb(null, uuidv4() + ext);
      // cb(null, file.or iginalname);
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
router.post("/deleteProducts/:productId", products.deleteProducts);
//update products
router.post(
  "/updateProducts/:productId",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
  ]),
  products.updateProducts
);
//select from where name = ""
router.get("/searchProducts/:nameProduct", products.searchProducts);
//select from product where id = ""
router.get("/product/:productId", products.getOneProduct);
module.exports = router;
