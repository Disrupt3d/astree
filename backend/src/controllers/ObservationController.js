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

  static count = (req, res) => {
    models.photo
      .countByUser(req.params.id)
      .then(([rows]) => {
        res.send(rows);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static read = (req, res) => {
    models.photo
      .find(req.params.id)
      .then(([rows]) => {
        if (rows[0] == null) {
          res.sendStatus(404);
        } else {
          res.send(rows[0]);
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static add = (req, res) => {
    const observation = req.body;

    models.photo
      .insert(observation)
      .then(([result]) => {
        res.status(201).send({ ...observation, id: result.insertId });
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static edit = (req, res) => {
    const observation = req.body;
    observation.photo_id = parseInt(req.params.id, 10);

    models.photo
      .update(observation, observation.photo_id)
      .then(([result]) => {
        if (result.affectedRows === 0) {
          res.sendStatus(404);
        } else {
          res.sendStatus(204);
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static delete = (req, res) => {
    models.photo
      .deleteObservation(req.params.id)
      .then(() => {
        res.status(204).send("photo deleted successfully");
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("error while deleting this post");
      });
  };
}

module.exports = ObservationController;
