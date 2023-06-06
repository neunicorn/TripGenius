const HistoryModel = require("../models/HistoryModel");

class History {
  async getAllHistory(req, res) {
    try {
      const { id } = req.jwt;
      const result = await HistoryModel.getAllHistory(id);
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
      const result = await HistoryModel.addHistory(id);
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
  async getDetailHistory(req, res) {
    try {
      const { id } = req.body;
      const result = await HistoryModel.getDetailHistory(id);
      if (!result) {
        throw {
          code: 404,
          message: "HISTORY_NOT_FOUND",
        };
      }
      return res.status(200).json({
        status: true,
        message: "GET_DETAIL_HISTORY_SUCCESS",
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
