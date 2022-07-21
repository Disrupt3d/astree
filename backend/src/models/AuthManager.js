const AbstractManager = require("./AbstractManager");

class AuthManager extends AbstractManager {
  static table = "user";

  find(id) {
    return this.connection.query(
      `SELECT * FROM ${this.table} WHERE ${this.table}.id = ?`,
      [id]
    );
  }

  findOne(email) {
    return this.connection
      .query(`SELECT * FROM ${this.table} WHERE email = ?`, [email])
      .then((user) => user[0][0]);
  }
}

module.exports = AuthManager;
