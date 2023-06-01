const db = require("../db/db.js");

class ListModel {
  static async getAllList(id) {
    const sql = ```SELECT
    list.id as id, 
    tempat_wisata.place_name as destinasi, 
    hotel.hotel_name as hotel, 
    transportation.name as kendaraan, 
    restaurant.resto_name as restaurant 
    FROM list
    JOIN tempat_wisata JOIN hotel JOIN transportation JOIN restaurant 
    JOIN list.uid_fk = ?```;
    const [result, _] = await db.query(sql, [id]);
    return result;
  }
}
module.exports = ListModel;
