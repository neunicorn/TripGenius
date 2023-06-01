const db = require("../db/db.js");

class ListModel {
  static async getAllList(id) {
    const sql = `SELECT list.id as id, tempat_wisata.place_name as destinasi, hotel.hotel_name as hotel, transportation.name as kendaraan, restaurant.resto_name as restaurant FROM list JOIN tempat_wisata JOIN hotel JOIN transportation JOIN restaurant WHERE list.uid_fk = ${id}`;
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
}
module.exports = ListModel;
