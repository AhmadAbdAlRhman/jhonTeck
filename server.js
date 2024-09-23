const express = require ("express");
const bodyParser = require("body-parser");
require("./modules/products");
const sequelize = require("./utils/database");
const app = express();
sequelize.sync()
.then(()=>{
    app.listen(3000);
    console.log("Ahmad");
}).catch((err)=>{
    console.error(err);
})

