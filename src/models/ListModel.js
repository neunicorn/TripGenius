const db = require("../db/db.js");

class ListModel {
  static async addList(data) {
    const sql = `INSERT INTO list (uid_fk, wisata_fk, hotel_fk, transportation_fk, restaurant_fk, status) VALUES (?, ?, ?, ?, ?, ?)`;
    const result = await db.query(sql, [
      data.uid_fk,
      data.wisata_fk,
      data.hotel_fk,
      data.transportation_fk,
      data.restaurant_fk,
      data.status,
    ]);
    return result;
  }

  static async getAllList(id, status) {
    const sql = `SELECT 
    list.id as id, 
    tempat_wisata.place_name as destinasi, 
    hotel.hotel_name as hotel, 
    transportation.name as kendaraan, 
    restaurant.resto_name as restaurant 
    FROM list 
    JOIN tempat_wisata ON (list.wisata_fk = tempat_wisata.id)
    JOIN hotel ON (list.hotel_fk = hotel.id)
    JOIN transportation ON (list.transportation_fk = transportation.id)
    JOIN restaurant ON (list.restaurant_fk = restaurant.id)
    WHERE list.uid_fk = ${id} 
    AND list.status = ${status}`;
    const [result, _] = await db.query(sql);
    return result[0];
  }

  static async getDetailList(id) {
    const sql = `
    SELECT
    list.id as id, 
    tempat_wisata.place_name as destinasi,
    tempat_wisata.description as deskripsi,
    tempat_wisata.category as kategori_wisata,
    hotel.hotel_name as hotel,
    hotel_price.name as bintang,
    hotel.address as alamat_hotel,
    restaurant.resto_name as restaurant,
    restaurant.address as alamat_resto,
    category_resto.name_category as kategori_resto,
    transportation.name as kendaraan
    FROM list
    JOIN tempat_wisata ON (list.wisata_fk = tempat_wisata.id)
    JOIN hotel ON  (list.hotel_fk = hotel.id)
    JOIN hotel_price ON (hotel.hotel_star = hotel_price.id)
    JOIN restaurant ON (list.restaurant_fk = restaurant.id)
    JOIN category_resto ON (restaurant.category = category_resto.id)
    JOIN transportation ON (list.transportation_fk = transportation.id)
    WHERE list.id = ${id};
    `;
    const [result, _] = await db.query(sql);
    return result[0];
  }

  static async addHistory(id) {
    const sql = `UPDATE list SET status = "false" WHERE id = ${id}`;
    const [result, _] = await db.query(sql);
    return result[0];
  }
}
module.exports = ListModel;
