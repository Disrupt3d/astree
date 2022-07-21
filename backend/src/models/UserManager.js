const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  static table = "user";

  findAll() {
    return this.connection.query(
      `SELECT * FROM ${this.table} INNER JOIN profile ON user.id = ${this.table}.user_id INNER JOIN profile ON profile.image_url = ${this.table}.images_id`
    );
  }

  find(id) {
    return this.connection.query(
      `SELECT * FROM ${this.table} INNER JOIN user ON user_id = ${this.table}.user_id INNER JOIN images ON images.id = ${this.table}.images_id WHERE ${this.table}.id = ?`,
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
