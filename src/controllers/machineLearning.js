const DataModel = require("../models/DataModel.js");

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
module.exports = new MachineLearning();
