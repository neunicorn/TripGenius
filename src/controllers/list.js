const ListModel = require("../models/ListModel.js");

class List {
  async getAllList(req, res) {
    const { id } = req.jwt;
    const result = await ListModel.getAllList(id);
    res.json(result);
  }

  async getDetailList(req, res) {}
}

module.exports = new List();
