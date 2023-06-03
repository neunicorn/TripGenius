const ListModel = require("../models/ListModel.js");

class List {
  async getAllList(req, res) {
    try {
      const { id } = req.jwt;
      const result = await ListModel.getAllList(id, "true");
      return res.status(200).json({
        status: true,
        message: "GET_ALL_LIST_SUCCESS",
        data: result,
      });
    } catch (err) {
      return res.status(err.code || 500).json({
        status: false,
        message: err.message,
      });
    }
  }
  async getDetailList(req, res) {
    try {
      const { id } = req.body;
      const result = await ListModel.getDetailList(id);
      return res.status(200).json({
        status: true,
        message: "GET_DETAIL_LIST_SUCCESS",
        data: result,
      });
    } catch (err) {
      return res.status(err.code || 500).json({
        status: false,
        message: err.message,
      });
    }
  }
  async addList(req, res) {
    try {
      const { wisata_fk, hotel_fk, tranportation_fk } = req.body;
      const uid_fk = req.jwt.id;
      const status = "true";
      const data = {
        uid_fk,
        wisata_fk,
        hotel_fk,
        tranportation_fk,
        status,
      };
      const result = await ListModel.addList(data);
      return res.status(200).json({
        status: true,
        message: "ADD_LIST_SUCCESS",
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

module.exports = new List();
