const db = require("../db/db.js");

class UserModel {
  constructor(name, username, email, password, phone, address) {
    this.name = name;
    this.username = username;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.address = address;
  }

  async save() {
    const sql = `INSERT INTO user (name, username, email, password, phone, address) 
        VALUES (?, ?, ?, ?, ?, ?)`;
    const result = await db.query(sql, [
      this.name,
      this.username,
      this.email,
      this.password,
      this.phone,
      this.address,
    ]);
    return result;
  }

  static async getOneUser(payload, value) {
    const sql = `SELECT * FROM user WHERE ${payload} = ?`;
    const result = await db.query(sql, [value]);
    return result[0];
  }

  static async updatePassword() {}
}
module.exports = UserModel;
