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
    const user = JSON.parse(req.body.user);
    delete user.image_url;
    if (!req.file) {
      models.profile
        .update(user, req.params.id)
        .then(() => {
          res.status(200).json(user);
        })
        .catch((err) => {
          console.error(err);
          res
            .status(500)
            .send("erreur pendant les modifications sur votre profil");
        });
    } else {
      models.profile
        .update({ ...user, image_url: req.image_url }, req.params.id)
        .then(() => {
          res.status(200).json({ ...user, image_url: req.image.url });
        })
        .catch((err) => {
          console.error(err);
          res
            .status(500)
            .send("erreur pendant les modifications sur votre profil");
        });
    }
  };
}

module.exports = ProfileController;
