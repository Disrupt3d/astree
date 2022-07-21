const express = require("express");
const { signinSchema, loginSchema, checkAuth } = require("./middleware/User");

const {
  ItemController,
  AuthController,
  UserController,
  ProfileController,
} = require("./controllers");

const router = express.Router();

router.get("/items", ItemController.browse);
router.get("/items/:id", ItemController.read);
router.put("/items/:id", ItemController.edit);
router.post("/items", ItemController.add);
router.delete("/items/:id", ItemController.delete);

// auth routes

router.post("/login", loginSchema, AuthController.login);
router.post("/signin", signinSchema, AuthController.signin);

//user
router.get("/user/", UserController.browse);
router.get("/user/:id", UserController.read);

//profile

router.get("/profile/", ProfileController.browse);
router.put("/profiles/:id", checkAuth, ProfileController.edit);

//observations
/*
// Retrieve all observations
router.get("/observation", ObservationController.browse);
// Create a new post with observation
router.post("/observation", ObservationController.add);
// Edit a specific observation
router.put("/observation/:id", ObservationController.edit);
// Delete an observation with id
router.delete("/:id", ObservationController.delete);
*/
module.exports = router;
