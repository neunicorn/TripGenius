const db = require("../db/db.js");

class register{
    constructor(name, username, email, password, phone, address){
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.address = address;
    }

    async save(){
        const sql = `INSERT INTO user (name, username, email, password, phone, address) 
        VALUES (
            '${this.name}', 
            '${this.username}', 
            '${this.email}', 
            '${this.password}', 
            '${this.phone}', 
            '${this.address}'
            )`;
        const result = await db.query(sql);
        return result;
    }

}
module.exports = register;