const express = require("express");
const authCtrl = require("../controllers/auth.controller");
const authRouter = express.Router();
authRouter.post("/signIn", authCtrl.signIn);

module.exports = authRouter;
