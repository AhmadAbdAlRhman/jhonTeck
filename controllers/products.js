const Products = require("../modules/products");
const { Sequelize, Op } = require("sequelize");
const path = require("path");
const fs = require("fs");
async function deleteImage(imagePath) {
  try {
    await fs.unlinkSync(imagePath); // Now this will work with the old version
    console.log("Old image deleted");
  } catch (err) {
    console.error("Failed to delete image:", err);
  }
}
async function deletePdf(pdfPath) {
  try {
    await fs.unlinkSync(pdfPath); // Now this will work with the old version
    console.log("Old image deleted");
  } catch (err) {
    console.error("Failed to delete image:", err);
  }
}
module.exports.getProducts = async (_req, res, _next) => {
  await Products.findAll()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};
module.exports.addProducts = async (req, res, _next) => {
  console.log(req.file);
  const { name, Description } = req.body;
  const image = req.files.image
    ? req.files.image[0].filename
    : req.file.filename;
  const pdf = req.files.pdf 
  ? req.files.pdf[0].filename : req.file.filename;
  const product = new Products({
    name,
    Description,
    Image: image,
    pdf: pdf,
  });
  await product
    .save()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};
module.exports.updateProducts = async (req, res, _next) => {
  const prodId = req.params.productId;
  const name = req.body.name;
  const Description = req.body.Description;
  const image = req.files.image
    ? req.files.image[0].filename
    : req.file.filename;
  const pdf = req.files.pdf ? req.files.pdf[0].filename : req.file.filename;
  try {
    let product = await Products.findOne({ where: { id: prodId } });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (product.Image !== image) {
      const imagePath = path.join(
        __dirname,
        "..",
        "public/images/",
        product.Image
      );
      await deleteImage(imagePath);
    }
    if (product.pdf !== pdf) {
      const pdfPath = path.join(
        __dirname,
        "..",
        "public/Document/",
        product.pdf
      );
      await deletePdf(pdfPath);
    }
    product.name = name;
    product.Description = Description;
    product.Image = image;
    product.pdf = pdf;
    await product.save();
    res.status(200).json({ message: "Product updated successfully" });
  } catch (err) {
    res.status(404).json(err);
  }
};
module.exports.deleteProducts = async (req, res, _next) => {
  try {
    const prodId = req.params.productId;
    let product = await Products.findOne({ where: { id: prodId } });
    let ImagePath = path.join(__dirname, "..", "public/images/", product.Image);
    let PdfPath = path.join(__dirname, "..", "public/Document/", product.pdf);
    await product.destroy().then(async () => {
      await deleteImage(ImagePath);
      await deletePdf(PdfPath);
    });
    res.status(200).json("This product is Successfully deleted");
  } catch (err) {
    res.status(404).json(err);
  }
};
module.exports.searchProducts = async (req, res, _next) => {
  const productName = req.params.nameProduct;
  await Products.findOne({
    where: Sequelize.where(Sequelize.fn("LOWER", Sequelize.col("name")), {
      [Op.like]: `%${productName.toLowerCase()}%`,
    }),
  })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};
module.exports.getOneProduct = async (req, res, _next) => {
  const prodId = req.params.productId;
  console.log(prodId);
  
  await Products.findOne({ where: { id: prodId } })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};
