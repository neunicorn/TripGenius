const DataModel = require("../models/DataModel.js");
const ImageHelper = require("../helpers/ImageHelper.js");

class Data {
  async getDestination(req, res) {
    try {
      const { page } = req.body;
      const OFFSET = (page - 1) * 10;
      const result = await DataModel.getDestination(OFFSET);

      return res.status(200).json({
        status: true,
        message: "GET_DATA_SUCCESS",
        data: {
          id: result.id,
          name: result.place_name,
          description: result.description,
          category: result.category,
          city: result.city,
          price: result.price,
          rating: result.rating,
          image: ImageHelper.getPublicUrl("destination_picture", result.image),
          lat: result.latitude,
          long: result.longitude,
        },
      });
    } catch (err) {
      return res.status(err.code || 500).json({
        status: false,
        message: err.message,
      });
    }
  }

  async getDetailDestination(req, res) {
    try {
      const { id } = req.params;
      const result = await DataModel.getDetailDestination(id);

      return res.status(200).json({
        status: true,
        message: "GET_DATA_SUCCESS",
        data: {
          id: result.id,
          name: result.place_name,
          description: result.description,
          category: result.category,
          city: result.city,
          price: result.price,
          rating: result.rating,
          image: ImageHelper.getPublicUrl("destination_picture", result.image),
          lat: result.latitude,
          long: result.longitude,
        },
      });
    } catch (err) {
      return res.status(err.code || 500).json({
        status: false,
        message: err.message,
      });
    }
  }

  async getHotel(req, res) {
    try {
      const { page } = req.body;
      const OFFSET = (page - 1) * 10;
      const result = await DataModel.getHotel(OFFSET);

      return res.status(200).json({
        status: true,
        message: "GET_DATA_SUCCESS",
        data: result,
      });
    } catch (err) {
      return res.status(err.code || 500).json({
        status: false,
        message: err.message,
      });
    }
  }

  async getDetailHotel(req, res) {
    try {
      const { id } = req.params;
      const result = await DataModel.getDetailHotel(id);

      return res.status(200).json({
        status: true,
        message: "GET_DATA_SUCCESS",
        data: result,
      });
    } catch (err) {
      return res.status(err.code || 500).json({
        status: false,
        message: err.message,
      });
    }
  }

  async getRestaurant(req, res) {
    try {
      const { page } = req.body;
      const OFFSET = (page - 1) * 10;
      const result = await DataModel.getRestaurant(OFFSET);

      return res.status(200).json({
        status: true,
        message: "GET_DATA_SUCCESS",
        data: result,
      });
    } catch (err) {
      return res.status(err.code || 500).json({
        status: false,
        message: err.message,
      });
    }
  }

  async getDetailRestaurant(req, res) {
    try {
      const { id } = req.params;
      const result = await DataModel.getDetailRestaurant(id);

      return res.status(200).json({
        status: true,
        message: "GET_DATA_SUCCESS",
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

module.exports = new Data();
