const express = require("express");
const {
  create,
  allToken,
  deleteToken
} = require("../../../controllers/backend/tokenController");
const _ = express.Router();

_.post("/create", create);
_.get("/alltoken", allToken);
_.get("/delete/:id", deleteToken);

module.exports = _;
