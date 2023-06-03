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
    try{
      let uid_fk = req.jwt.id;
      let { wisata_fk, hotel_fk, transportation_fk, restaurant_fk } = req.body;

      const result = await ListModel.addList(
        wisata_fk, 
        hotel_fk, 
        transportation_fk,
        uid_fk,
        restaurant_fk, 
      );
      return res.status(200).json({
        status: true,
        message: "ADD_LIST_SUCCESS",
        data: result,
      });
    }catch(err){
      console.log(err);
      return res.status(err.code || 500).json({
        status: false,
        message: err.message,
      });
    }
  }
}

module.exports = new List();
