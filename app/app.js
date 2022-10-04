// external imports
const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");

// internal imports
const authRouter = require("../routes/auth.routes");
const userRoutes = require("../routes/user.routes");
const clientReviewRouter = require("../routes/clientReview.routes");
const blogRouters = require("../routes/blogs.routes");
const projectsRouters = require("../routes/project.routes");
// create app
const app = express();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
const corsOptions = {
  origin: "http://127.0.0.1:5173",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

//routers
app.use("/api/users", userRoutes);
app.use("/api/auth", authRouter);
app.use("/api/reviews", clientReviewRouter);
app.use("/api/blogs", blogRouters);
app.use("/api/projects", projectsRouters);

// to check application health
app.get("/api/health", (req, res) => {
  res.status(200).send("hello health");
});

// handle auth related errors
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ": " + err.message });
  } else if (err) {
    res
      .status(err.status || 400)
      .json({ error: err.name + ": " + err.message });
    console.log(err);
  }
});

module.exports = app;
