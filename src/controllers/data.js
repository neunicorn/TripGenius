const DataModel = require("../models/DataModel.js");
const ImageHelper = require("../helpers/ImageHelper.js");

class Data {
  async getDestination(req, res) {
    try {
      const { page } = req.body;
      const OFFSET = (page - 1) * 10;
      const result = await DataModel.getDestination(OFFSET);
      const data = result.map((item) => {
        return {
          id: item.id,
          name: item.place_name,
          description: item.description,
          category: item.category,
          city: item.city,
          price: item.price,
          rating: item.rating,
          image: ImageHelper.getPublicUrl("destination_picture", item.image),
          lat: item.latitude,
          long: item.longtitude,
          coodinate: item.coordinate,
        };
      });

      return res.status(200).json({
        status: true,
        message: "GET_DATA_SUCCESS",
        data,
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
      const data = {
        id: result.id,
        name: result.place_name,
        description: result.description,
        category: result.category,
        city: result.city,
        price: result.price,
        rating: result.rating,
        image: ImageHelper.getPublicUrl("destination_picture", result.image),
        lat: result.latitude,
        long: result.longtitude,
        coodinate: result.coordinate,
      };

      return res.status(200).json({
        status: true,
        message: "GET_DATA_SUCCESS",
        data,
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

  async getRestaurantPredict(req, res) {
    try {
      const { id } = req.body;
      console.log(id);
      const result = await DataModel.getRestaurantById(id);

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
  async getDestinationPredict(req, res) {
    try {
      const { id } = req.body;
      const result = await DataModel.getDestinationById(id);

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
