const AbstractManager = require("./AbstractManager");

class ProfileManager extends AbstractManager {
  static table = "profile";

  findAll() {
    return this.connection.query(
      `SELECT * FROM ${this.table} JOIN user on ${this.table}.user_id = user.user_id`
    );
  }

  find(id) {
    return this.connection
      .query(
        `SELECT * FROM ${this.table} JOIN user on ${this.table}.user_id = user.user_id WHERE ${this.table}.user_id = ?`,
        [id]
      )
      .then((res) => res);
  }

  insert(profile, id) {
    return this.connection.query(
      `INSERT INTO ${this.table} (pseudo, user_id) VALUES ( ?, ?)`,
      [profile.pseudo, id]
    );
  }

  update(profile, id) {
    return this.connection.query(
      `UPDATE ${this.table}  SET ? WHERE user_id = ?`,
      [profile, id]
    );
  }
}

module.exports = ProfileManager;