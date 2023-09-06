const tokenModel = require("../../models/token");

module.exports = {
  async create(req, res) {
    const { title, description } = req.body;
    const duplicateToken = await tokenModel.find({ token: title });

    if (title === "") {
      return res.send({
        error: {
          title: "Token field is required!",
        },
      });
    }

    if (duplicateToken.length == 0) {
      const tokenCreate = new tokenModel({
        token: title,
        description,
      });
      tokenCreate.save();
      return res.send({
        success: "Token Create Successfull.",
      });
    } else {
      return res.send({
        error: {
          title: "This token has already taken!",
        },
      });
    }
  },

  async allToken(req, res) {
    const tokenAll = await tokenModel.find({});

    res.send({
      data: tokenAll,
    });
  },

  async deleteToken(req, res) {
    const id = req.params.id;
    try {
      await tokenModel.findOneAndDelete({
        _id: id,
      });

      return res.send({ data: "Token Delete Success." });
    } catch (err) {
      return res.send({ error: "No data found in this ID." });
    }
  },
};
