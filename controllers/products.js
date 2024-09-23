const Products = require("../modules/products");

module.exports.getProducts = async (_req,res,_next) => {
    await Products.findAll()
    .then((result)=>{
        res.status(200).json(result);
    }).catch((err)=>{
        res.status(404).json(err);
    })
}
module.exports.addProducts = async (req,res,_next) => {
    const {name, Description, image, pdf} = req.body;
    const product = new Products({
        name,
        Description,
        image,
        pdf
    });
    await product.save().then((result)=>{
        res.status(200).json(result);
    }).catch((err)=>{
        res.status(404).json(err);   
    });
}
module.exports.updateProducts = async (req,res,_next) => {
    const { name, Description, image, pdf } = req.body;
    const product = new Products({
      name,
      Description,
      image,
      pdf,
    });
    await product
      .update()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(404).json(err);
      });
}
module.exports.deleteProducts = async (req,res,_next) => {
    const prodId = req.body.productId;
    await Products
    .destroy({where:{id:prodId}})
    .then((result)=>{
        res.status(200).json(result);
    }).catch((err)=>{
        res.status(404).json(err);
    })
}
module.exports.searchProducts = async (req,res,next) => {
    
}