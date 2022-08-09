const Joi = require("joi");
const jwt = require("jsonwebtoken");

const signinSchema = (req, res, next) => {
  const { error } = Joi.object({
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "fr"] },
    }),
    pseudo: Joi.string().min(3).max(25).required(),

    password: Joi.string().min(8).max(25).required(),
  }).validate(req.body, { abortEarly: false });

  if (!error) {
    next();
  } else {
    res.status(400).json(error);
  }
};
const loginSchema = (req, res, next) => {
  const { error } = Joi.object({
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "fr"] },
    }),

    password: Joi.string().min(8).max(25).required(),
  }).validate(req.body, { abortEarly: false });

  if (!error) {
    next();
  } else {
    res.status(400).json(error);
  }
};
const checkAuth = (req, res, next) => {
  if (req.cookies) {
    jwt.verify(
      req.cookies.user_token,
      process.env.PRIVATETOKEN,
      (err, decode) => {
        if (err) {
          res.status(401).send("Vous n'avez pas les bons accès");
        } else {
          req.user = decode;
          next();
        }
      }
    );
  } else {
    res.status(401).send("Vous n'avez pas les bons accès");
  }
};

module.exports = {
  checkAuth,
  signinSchema,
  loginSchema,
};
