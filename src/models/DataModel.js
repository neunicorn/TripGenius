const db = require("../db/db.js");

class DataModel {
    static async getHotel() {
        const sql = `select
        hotel.id, 
        hotel.hotel_name, 
        hotel.address, 
        hotel_category.name as category_hotel, 
        hotel_price.min_price, 
        hotel_price.max_price 
        FROM hotel JOIN hotel_category on hotel.hotel_category = hotel_category.id 
        JOIN hotel_price ON hotel.hotel_star = hotel_price.id `;
        const result = await db.query(sql);
        return result[0]
    }

    static async getDestination() {
        const sql = `select * from tempat_wisata where city = "bandung"`;
        const result = await db.query(sql);
        return result[0]
    }

    static async getRestaurant() {
        const sql = `select 
        restaurant.id, 
        restaurant.resto_name, 
        restaurant.address, 
        category_resto.name_category, 
        category_resto.min_price, 
        category_resto.max_price, 
        restaurant.latitude, 
        restaurant.longtitude 
        FROM restaurant JOIN category_resto ON restaurant.category = category_resto.id;`;
        const result = await db.query(sql);
        return result[0]
    }
}
module.exports = DataModel;