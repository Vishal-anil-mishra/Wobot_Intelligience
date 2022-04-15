const express = require("express");
//const verifymiddleware = require('../middleware/verify')
//const uploadmiddleware = require("../middleware/upload")
const router = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "csv");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname) );
    },
  });
  
const upload = multer({ storage: storage });
const {createproducts,getallproducts} = require("../controllers/product")
router.route("/").post(upload.single("file"),createproducts).get(getallproducts);


module.exports = router