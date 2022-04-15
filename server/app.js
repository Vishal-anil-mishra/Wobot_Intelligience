require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const authrouter = require("./routes/user");
const productrouter = require("./routes/product");
const verifymiddleware = require('./middleware/verify')
const bodyParser  = require('body-parser'); 
const path = require("path"); 
app.use(express.static(path.resolve(__dirname,'csv')));  
app.use(bodyParser.urlencoded({extended:false}));  
app.use(express.json());


app.use("/api/user",authrouter);
app.use("/api/product",verifymiddleware,productrouter);

const Port = process.env.Port || 3000;
const start = async () => {
  try {
    await connectDB(process.env.mongo_url);
    app.listen(Port, () =>
      console.log(`Server is listening on port ${Port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};
start();
