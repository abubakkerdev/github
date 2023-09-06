const mongoose = require("mongoose");
const db_name = process.env.DB_DATABASE;
const db_uname = process.env.DB_USERNAME;
const db_password = process.env.DB_PASSWORD;

const databaseConnect = () => {
  mongoose
    .connect(
      `mongodb+srv://${db_uname}:${db_password}@cluster0.kcnvllw.mongodb.net/${db_name}?retryWrites=true&w=majority`
    )
    .then(() => console.log("Connected!"));
};

module.exports = databaseConnect;
