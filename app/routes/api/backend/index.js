const express = require("express");
const _ = express.Router();
const authenticationRoutes = require("./authentication");
const tokenRoutes = require("./token");
const departmentRoutes = require("./department");
const courseRoutes = require("./course");

_.use("/authentication", authenticationRoutes);
_.use("/token", tokenRoutes);
_.use("/department", departmentRoutes);
_.use("/course", courseRoutes);

module.exports = _;
