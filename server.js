const express = require ("express");
const path = require("path");
const bodyParser = require("body-parser");
require("./modules/products");
const sequelize = require("./utils/database");
const app = express();
const proRoute = require("./route/products");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(proRoute);
sequelize.sync()
.then(()=>{
    app.listen(`This is server is work at http://localhost:3000`);
}).catch((err)=>{
    console.error(err);
})

