const db = require("../db/db.js");

class ListModel {
  static async getAllList(id) {
    const sql = ```select
    list.id as id, 
    tempat_wisata.place_name as destinasi, 
    hotel.hotel_name as hotel, 
    transportation.name as kendaraan, 
    restaurant.resto_name as restaurant 
    from list
    join tempat_wisata join hotel join transportation join restaurant 
    where list.uid_fk = ?```;
    const [result, _] = await db.query(sql, [id]);
    return result;
  }
}

module.exports = ListModel;
