const User = require("../models/user");

const get_registered = async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.create({ ...req.body });
    const token = user.getToken();
    return res.json({ user: user, token: token });
  } catch (error) {
    return res.status(400).json(error);
  }
};

const get_logged_in = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ msg: "plzz provide username and password" });
  }
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ msg: "Invalid credentials" });
  }
  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    return res.status(400).json({ msg: "Invalid Credentials" });
  }
  const token = user.getToken();
  return res.json({ user: user, token: token });
};

const getallusers = async (req, res) => {
  try {
    const users = await User.find();
    return res.json({ allusers: users });
  } catch (error) {
    return res.status(400).json(error);
  }
};

const get_single_user = async (req, res) => {
  const{id} = req.params;
  try {
    const user = await User.findOne({_id:id});
    return res.json({ user: user });
  } catch (error) {
    return res.status(400).json(error);
  }
};
module.exports = {
  get_logged_in,
  get_registered,
  getallusers,
  get_single_user,
};
