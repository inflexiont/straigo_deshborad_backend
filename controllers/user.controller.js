const User = require("../models/User.model");
const errorHandler = require("./error.controller");
const { createUserService } = require("../services/user.services");

const create = async (req, res, next) => {
  try {
    const { newUser, accessToken } = await createUserService(req, res);
    const { _id, name, email } = newUser;
    res.status(200).json({
      message: "Successfully signed up!",
      accessToken,
      user: {
        id: _id,
        name,
        email,
      },
    });
  } catch (err) {
    next(err);
  }
};
const list = async (req, res) => {
  try {
    let users = await User.find().select("name email createdAt  ");
    res.json(users);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};
const read = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    res.status(200).json({
      name: user?.name,
      email: user?.email,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const filter = { _id: req.params.userId };
    const update = {
      name: req.body.name,
      email: req.body.email,
    };
    const option = { new: true };
    const updatedUser = await User.findOneAndUpdate(filter, update, option);
    res.status(200).json({
      status: "success",
      user: {
        name: updatedUser?.name,
        email: updatedUser?.email,
      },
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
};
const remove = async (req, res, next) => {
  try {
    let userId = req.params.userId;
    await User.findByIdAndDelete(userId);
    res.status(203).json({ message: "success" });
  } catch (err) {
    next(err);
  }
};
module.exports = {
  create,
  list,
  read,
  update,
  remove,
};
