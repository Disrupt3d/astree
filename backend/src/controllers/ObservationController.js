const models = require("../models");

class ObservationController {
  static browse = (req, res) => {
    models.photo
      .findAll()
      .then(([rows]) => {
        res.send(rows);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };
}

module.exports = ObservationController;
