const db = require("../db/db.js");

class DataModel {
  static async getHotel(OFFSET) {
    const sql = `select
        hotel.id, 
        hotel.hotel_name, 
        hotel.address, 
        hotel_category.name as category_hotel, 
        hotel_price.name as bintang,
        hotel_price.min_price, 
        hotel_price.max_price 
        FROM hotel JOIN hotel_category on hotel.hotel_category = hotel_category.id 
        JOIN hotel_price ON hotel.hotel_star = hotel_price.id 
        LIMIT 10 OFFSET ${OFFSET}`;
    const result = await db.query(sql);
    return result[0];
  }
  static async getDetailHotel(id) {
    const sql = `select
        hotel.id, 
        hotel.hotel_name, 
        hotel.address, 
        hotel_category.name as category_hotel,
        hotel_price.name as bintang, 
        hotel_price.min_price, 
        hotel_price.max_price 
        FROM hotel JOIN hotel_category on hotel.hotel_category = hotel_category.id 
        JOIN hotel_price ON hotel.hotel_star = hotel_price.id 
        where hotel.id = ${id}`;
    const result = await db.query(sql);
    return result[0];
  }

  static async getDestination(OFFSET) {
    const sql = `select * from tempat_wisata where city = "bandung" LIMIT 10 OFFSET ${OFFSET}`;
    const result = await db.query(sql);
    return result[0];
  }
  static async getDetailDestination(id) {
    const sql = `select * from tempat_wisata where id = ${id}`;
    const [result, _] = await db.query(sql);
    return result[0];
  }

  static async getRestaurant(OFFSET) {
    const sql = `select 
        restaurant.id, 
        restaurant.resto_name, 
        restaurant.address, 
        category_resto.name_category, 
        category_resto.min_price, 
        category_resto.max_price, 
        restaurant.latitude, 
        restaurant.longtitude 
        FROM restaurant JOIN category_resto ON restaurant.category = category_resto.id
        LIMIT 10 OFFSET ${OFFSET}`;
    const result = await db.query(sql);
    return result[0];
  }

  static async getDetailRestaurant(id) {
    const sql = `select 
        restaurant.id, 
        restaurant.resto_name, 
        restaurant.address, 
        category_resto.name_category, 
        category_resto.min_price, 
        category_resto.max_price, 
        restaurant.latitude, 
        restaurant.longtitude 
        FROM restaurant JOIN category_resto ON restaurant.category = category_resto.id
        where restaurant.id = ${id}`;
    const result = await db.query(sql);
    return result[0];
  }

  static async getDestinationById(id) {
    // get destination by lot of id
    const sql = `select * from tempat_wisata where id in (?)`;
    const [result, _] = await db.query(sql, [id]);
    return result;
  }

  static async getRestaurantById(id_1) {
    // get restaurant by lot of id
    console.log(id_1);
    const sql = `select * from restaurant where id in (?)`;
    const [result, _] = await db.query(sql, [id_1]);
    return result;
  }
}
module.exports = DataModel;
