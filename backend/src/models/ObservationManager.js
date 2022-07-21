const AbstractManager = require("./AbstractManager");

class observationManager extends AbstractManager {
  static table = "photo";

  find(id) {
    return this.connection.query(
      `select * from  ${this.table} where photo_id = ?`,
      [id]
    );
  }

  findAll() {
    return this.connection.query(
      `select * from  ${this.table} INNER JOIN profile on profile_id =id LIMIT 10`
    );
  }

  insert(observation) {
    return this.connection.query(
      `insert into ${this.table} ( title, date, dpt_location, description, photo_url, photo_alt, city_location, profile_id ) values ( ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        observation.title,
        observation.date,
        observation.dpt_location,
        observation.description,
        observation.photo_url,
        observation.photo_alt,
        observation.city_location,
        observation.profile_id,
      ]
    );
  }

  update(observation, id) {
    return this.connection.query(
      `update ${this.table} set ? where photo_id = ?`,
      [observation, id]
    );
  }

  deleteObservation(id) {
    return this.connection.query(
      `delete from ${this.table} where photo_id = ?`,
      [id]
    );
  }
}

module.exports = observationManager;
