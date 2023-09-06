class CategoryController {
  index(req, res) {
    res.json("All Category Data Show.");
  }
  store(req, res) {
    res.json("Store Single Category Data.");
  }
  edit(req, res) {
    res.json("Edit Single Category Data.");
  }
  update(req, res) {
    res.json("Update Single Category Data.");
  }
  destroy(req, res) {
    res.json("Delete Single Category Data.");
  }
}

module.exports = new CategoryController();
