const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const config = require("../config/config");
const jwt = require("jsonwebtoken");

const createUserService = async (req, res) => {
  const { password, name, email } = req.body;

  //check user is exists
  const user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({ message: "user is already exists" });
  } else {
    let newUser;
    // const user = new User(req.body);
    if (password.length < 6) {
      return res.status(403).json({ message: "password too short" });
    }

    const UserPayload = {
      name,
      email,
    };
    const accessToken = jwt.sign({ ...UserPayload }, config.jwtSecret);

    // hashing password.(registration)
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // Upload image to cloudinary

    // const result = await cloudinary.uploader.upload(req.file.path);
    newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    return { newUser: await newUser.save(), accessToken };
  }
};
module.exports = { createUserService };
