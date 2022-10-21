// express
const express = require("express");

// express router
const router = express.Router();

// destructured user controllers
const {
  signupUser,
  loginUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
} = require("../controllers/userControllers");

// signup user
router.post("/signup", signupUser);

// login user
router.post("/login", loginUser);

// GET all users
router.get("/", getUsers);

// GET a single user
router.get("/:id", getUser);

// DELETE a user
router.delete("/:id", deleteUser);

// UPDATE a user
router.patch("/:id", updateUser);

// export users router
module.exports = router;
