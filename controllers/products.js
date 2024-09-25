const Products = require("../modules/products");
const { Sequelize, Op } = require("sequelize");
const path = require("path");
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
  const { name, Description } = req.body;
  const image = req.files.image
    ? req.files.image[0].filename
    : req.file.filename;
  const pdf = req.files.pdf ? req.files.pdf[0].filename : req.file.filename;
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
  const prodId = req.body.prodId;
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
    if (imagePath && product.Image !== image) {
      const imagePath = path.join(
        __dirname,
        "..",
        "public/images/",
        product.Image
      );
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
        console.log("Old image deleted");
      }
    }
    if (pdfPath && product.pdf !== pdf) {
      const pdfPath = path.join(
        __dirname,
        "..",
        "public/Document/",
        product.pdf
      );
      if (fs.existsSync(pdfPath)) {
        fs.unlinkSync(pdfPath);
        console.log("Old PDF deleted");
      }
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
  const prodId = req.body.productId;
  await Products.destroy({ where: { id: prodId } })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
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
  const prodId = req.body.productId;
  await Products.findAll({ where: { id: prodId } })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};
