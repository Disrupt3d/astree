const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  static table = "user";

  findAll() {
    return this.connection.query(`SELECT * FROM ${this.table}`);
  }

  find(id) {
    return this.connection.query(
      `SELECT * FROM ${this.table} WHERE ${this.table}_id = ?`,
      [id]
    );
  }

  findOne(email) {
    return this.connection
      .query(`SELECT * FROM ${this.table} WHERE email = ?`, [email])
      .then((user) => user[0][0]);
  }

  insert({ id, email, hashedpassword }) {
    return this.connection.query(
      `INSERT INTO ${this.table} (user_id, email, hashedpassword) VALUES (?, ?, ? )`,
      [id, email, hashedpassword]
    );
  }
}

module.exports = UserManager;
