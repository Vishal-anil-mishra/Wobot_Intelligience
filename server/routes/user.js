const express = require("express");
const router = express.Router();
const verifymiddleware = require('../middleware/verify')
const {
  get_registered,
  get_logged_in,
  getallusers,
  get_single_user,
} = require("../controllers/user");

router.route("/").get(verifymiddleware,getallusers);
router.route("/:id").get(verifymiddleware,get_single_user);
router.route("/register").post(get_registered);
router.route("/login").post(get_logged_in);

module.exports = router;
