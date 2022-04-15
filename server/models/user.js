const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "plz provide your firstname"],
  },
  lastname: {
    type: String,
    required: [true, "plz provide your lastname"],
  },
  username: {
    type: String,
    required: [true, "plz provide username"],
    unique: true,
    minlength: 3,
    maxlength: 50,
  },
  password: {
    type: String,
    required: [true, "plz provide your password"],
    minlength: 6,
    maxlength: 20,
  },
});

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.getToken = function () {
  const token = jwt.sign(
    { userid: this._id, username: this.username },
    process.env.Jwt_secret_key,
    { expiresIn: process.env.Jwt_lifetime }
  );
  return token;
};

UserSchema.methods.comparePassword = async function (candidatepassword) {
  //console.log(candidatepassword, this.password);
  const isMatch = await bcrypt.compare(candidatepassword, this.password);
  return isMatch;
};
module.exports = mongoose.model("User", UserSchema);