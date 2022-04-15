const Product = require("../models/product");
const path = require("path");
const csv = require("csvtojson");

const createproducts = async (req, res) => {
  console.log("product controller");
  let temp = [{}];
  await csv()
    .fromFile(req.file.path)
    .then((jsonObj) => {
      //console.log(jsonObj);
      for (var x = 0; x < jsonObj.length; x++) {
        temp = parseFloat(jsonObj[x].quantity);
        jsonObj[x].quantity = temp;
        temp = parseFloat(jsonObj[x].price);
        jsonObj[x].price = temp;
        jsonObj[x].createdBy = req.user.username;
      }
      //console.log(jsonObj);
      temp = jsonObj;
    });
  console.log(temp);
  const products = await Product.insertMany(temp);
  res.json(products);
};

const getallproducts = async(req,res)=>{
    const products = await Product.find();
    res.json({length:products.length , allproducts:products});
}
module.exports = {
    createproducts,
    getallproducts
}
