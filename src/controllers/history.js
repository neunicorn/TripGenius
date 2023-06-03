const ListModel = require("../models/ListModel.js");

class History {
  async getAllHistory(req, res) {
    try {
      const { id } = req.jwt;
      const result = await ListModel.getAllList(id, "false");
      return res.status(200).json({
        status: true,
        message: "GET_ALL_HISTORY_SUCCESS",
        data: result,
      });
    } catch (err) {
      return res.status(err.code || 500).json({
        status: false,
        message: err.message,
      });
    }
  }
  async addToHistory(req, res) {
    try {
      const { id } = req.body;
      const result = await ListModel.addHistory(id);
      return res.status(200).json({
        status: true,
        message: "ADD_TO_HISTORY_SUCCESS",
        data: result,
      });
    } catch (err) {
      return res.status(err.code || 500).json({
        status: false,
        message: err.message,
      });
    }
  }
}

module.exports = new History();
