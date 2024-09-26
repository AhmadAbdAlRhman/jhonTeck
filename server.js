const express = require ("express");
const path = require("path");
const bodyParser = require("body-parser");
require("./modules/products");
const sequelize = require("./utils/database");
const app = express();
const proRoute = require("./route/products");
const corsOption = {
  origin: ["http://localhost:4784", "http://localhost:3001"],
  methods: ["POST", "GET"],
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOption));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(proRoute);
sequelize.sync()
.then(()=>{
    app.listen(4784);
    console.log(`This is server is work at http://localhost:4784`);
}).catch((err)=>{
    console.error(err);
})

