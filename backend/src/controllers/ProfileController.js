const models = require("../models");

class ProfileController {
  static browse = (req, res) => {
    models.profile
      .findAll()
      .then(([rows]) => {
        res.send(rows);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static read = (req, res) => {
    models.profile
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

  static edit = (req, res) => {
    const profile = req.body;
    profile.id = parseInt(req.params.id, 10);

    models.profile
      .update(
        {
          pseudo: profile.pseudo,
          city: profile.city,
          telescope: profile.telescope,
          camera: profile.camera,
          biography: profile.biography,
          image_url: profile.image_url,
          image_alt: profile.image_alt,
        },
        profile.id
      )
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
}

module.exports = ProfileController;
