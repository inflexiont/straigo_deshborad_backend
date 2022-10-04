const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 5000,
  jwtSecret:
    process.env.JWT_SECRET ||
    "4715aed3c946f7b0a38e6b534a9583628d84e96d10fbc04700770d572af3dce43625dd",
  mongoUri:
    process.env.MONGODB_URI ||
    process.env.MONGO_HOST ||
    "mongodb://" +
      (process.env.IP || "localhost") +
      ":" +
      (process.env.MONGO_PORT || "27017") +
      "/straigo",
  codenaryCloudName: "serabuy-com",
  codenaryAPIKEY: "243918522254865",
  codenarySECRET: "nmhYboCl65ub_QNm6fA7Rd5mxmg",
};
module.exports = config;
