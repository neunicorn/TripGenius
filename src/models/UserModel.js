const db = require("../db/db.js");

class UserModel {
  constructor(
    name,
    username,
    email,
    password,
    phone,
    home_town,
    age,
    gender,
    location,
    avatar
  ) {
    this.name = name;
    this.username = username;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.home_town = home_town;
    this.age = age;
    this.gender = gender;
    this.location = location;
    this.avatar = avatar;
  }

  async save() {
    const sql = `INSERT INTO user (name, username, email, password, phone, home_town, age, gender, location, profile_picture) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const result = await db.query(sql, [
      this.name,
      this.username,
      this.email,
      this.password,
      this.phone,
      this.home_town,
      this.age,
      this.gender,
      this.location,
      this.avatar,
    ]);
    return result;
  }

  static async getOneUser(payload, value) {
    const sql = `SELECT * FROM user WHERE ${payload} = ?`;
    const [result, _] = await db.query(sql, [value]);
    return result[0];
  }

  static async getOneUserById(what, id) {
    const sql = `SELECT ${what} FROM user WHERE id = ?`;
    const [result, _] = await db.query(sql, [id]);
    return result[0];
  }

  static async updatePassword(pass, id) {
    const sql = `UPDATE user SET password = ? WHERE id = ?`;
    const result = await db.query(sql, [pass, id]);
    return result;
  }

  static async updateProfile(
    name,
    username,
    email,
    phone,
    home_town,
    avatar,
    id
  ) {
    const sql = `UPDATE user SET name = ?, username = ?, email = ?, phone = ?, home_town = ?, profile_picture = ? WHERE id = ?`;
    const result = await db.query(sql, [
      name,
      username,
      email,
      phone,
      home_town,
      avatar,
      id,
    ]);
    return result[0];
  }
}
module.exports = UserModel;
