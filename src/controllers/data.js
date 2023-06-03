const DataModel = require("../models/DataModel.js");

class Data {
    async getDestination(req, res) {
        try{
            const result = await DataModel.getDestination();
            
            return res.status(200).json({
                status: true,
                message: "GET_DATA_SUCCESS",
                data: result,
            });
        }catch(err){
            return res.status(err.code || 500).json({
                status: false,
                message: err.message,
            });
        }
    }

    async getHotel(req, res) {
        try{
            const result = await DataModel.getHotel();

            return res.status(200).json({
                status: true,
                message: "GET_DATA_SUCCESS",
                data: result,
            });
        }catch(err){
            return res.status(err.code || 500).json({
                status: false,
                message: err.message,
            });
        }
    }

    async getRestaurant(req, res) {
        try{
            const result = await DataModel.getRestaurant();

            return res.status(200).json({
                status: true,
                message: "GET_DATA_SUCCESS",
                data: result,
            });
        }catch(err){
            return res.status(err.code || 500).json({
                status: false,
                message: err.message,
            });
        }
    }

}

module.exports = new Data();