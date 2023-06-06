const db = require("../db/db");

class HistoryModel {
  static async addHistory(id) {
    const sql = `UPDATE list SET status = "false" WHERE id = ${id}`;
    const [result, _] = await db.query(sql);
    return result[0];
  }
  static async getAllHistory(id) {
    const sql = `SELECT 
    list.id as id, 
    tempat_wisata.place_name as destinasi, 
    hotel.hotel_name as hotel, 
    transportation.name as kendaraan, 
    restaurant.resto_name as restaurant 
    FROM list 
    LEFT JOIN tempat_wisata ON (list.wisata_fk = tempat_wisata.id)
    LEFT JOIN hotel ON (list.hotel_fk = hotel.id)
    LEFT JOIN transportation ON (list.transportation_fk = transportation.id)
    LEFT JOIN restaurant ON (list.restaurant_fk = restaurant.id)
    WHERE list.uid_fk = ${id}
    AND list.status = "false"`;
    const [result, _] = await db.query(sql);
    return result[0];
  }

  static async getDetailHistory(id) {
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
    LEFT JOIN tempat_wisata ON (list.wisata_fk = tempat_wisata.id)
    LEFT JOIN hotel ON  (list.hotel_fk = hotel.id)
    LEFT JOIN hotel_price ON (hotel.hotel_star = hotel_price.id)
    LEFT JOIN restaurant ON (list.restaurant_fk = restaurant.id)
    LEFT JOIN category_resto ON (restaurant.category = category_resto.id)
    LEFT JOIN transportation ON (list.transportation_fk = transportation.id)
    WHERE list.id = ${id}
    AND list.status = "false"
    `;
    const [result, _] = await db.query(sql);
    return result[0];
  }
}

module.exports = HistoryModel;
