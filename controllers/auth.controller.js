const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const config = require("../config/config");
const bcrypt = require("bcrypt");

const error = require("../services/error");
// check user is login with jwt token
const requireSignIn = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log(token);
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, config.jwtSecret, (err, user) => {
    if (err) return res.sendStatus(403).json({ error: err.message });
    req.tokenUserId = user._id;
    req.profile = user;
    next();
  });
};

// user authorized to update and delete own details
const hasAuthorization = (req, res, next) => {
  // const token = req.cookies.t;
  const sessionToken = req.headers["authorization"].split(" ")[1];
  if (sessionToken) {
    jwt.verify(sessionToken, config.jwtSecret, (err, decodedToken) => {
      if (err) {
        throw error(401, "Not authorized");
      } else {
        const authorized = req.params.userId === decodedToken.userId;
        console.log(req.params.userId);
        console.log(decodedToken.userId);
        console.log(authorized);
        if (!authorized) {
          return res
            .status(403)
            .json({ error: "User is not authorized for this operation" });
        } else {
          next();
          console.log("fast");
        }
      }
    });
  } else {
    throw error(403, "User is not authorized ");
  }
};

const signIn = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status("401").json({ error: "User not found" });
    const isMatchedPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    const { _id, name, email } = user;
    if (isMatchedPassword) {
      const UserPayload = {
        id: _id,
        name,
        email,
      };
      const token = jwt.sign({ ...UserPayload }, config.jwtSecret);
      //set to cookies
      // res.cookie("t", token, { expire: new Date() + 9999 });
      res.status(200).json({
        accessToken: token,
        user: {
          id: _id,
          name,
          email,
        },
      });
    } else {
      return res.status("401").send({ error: "Wrong credential" });
    }
  } catch (err) {
    return res.status("401").json({ error: err });
  }
};

module.exports = { signIn, requireSignIn, hasAuthorization };
