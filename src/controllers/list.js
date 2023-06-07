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
      const { id } = req.params;
      const result = await ListModel.getDetailList(id, "true");
      if (!result) {
        throw {
          code: 404,
          message: "LIST_NOT_FOUND",
        };
      }
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
      let uid_fk = req.jwt.id;
      let { wisata_fk, hotel_fk, transportation_fk, restaurant_fk } = req.body;
      if (!wisata_fk) {
        wisata_fk = null;
      }
      if (!hotel_fk) {
        hotel_fk = null;
      }
      if (!transportation_fk) {
        transportation_fk = null;
      }
      if (!restaurant_fk) {
        restaurant_fk = null;
      }

      const result = await ListModel.addList(
        wisata_fk,
        hotel_fk,
        transportation_fk,
        uid_fk,
        restaurant_fk
      );
      return res.status(200).json({
        status: true,
        message: "ADD_LIST_SUCCESS",
        data: result,
      });
    } catch (err) {
      console.log(err);
      return res.status(err.code || 500).json({
        status: false,
        message: err.message,
      });
    }
  }
}

module.exports = new List();
