const DataModel = require("../models/DataModel.js");
const ImageHelper = require("../helpers/ImageHelper.js");

class MachineLearning {
  async getRestaurantPredict(req, res) {
    try {
      const { id } = req.query;
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
      const { id } = req.query;
      console.log(id);
      const result = await DataModel.getDestinationById(id);
      const data = result.map((item) => {
        return {
          id: item.id,
          place_name: item.place_name,
          image: ImageHelper.getPublicUrl("destination_picture", item.image),
          description: item.description,
          category: item.category,
          city: item.city,
          rating: item.rating,
        };
      });
      return res.status(200).json({
        status: true,
        message: "GET_DATA_SUCCESS",
        data,
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
module.exports = new MachineLearning();
