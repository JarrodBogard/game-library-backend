// express
const express = require("express");

// express router
const router = express.Router();

// middleware
const requireAuth = require("../middleware/requireAuth");

// destructured game controllers
const {
  getGames,
  getGame,
  createGame,
  deleteGame,
  updateGame,
} = require("../controllers/gameControllers");

router.use(requireAuth);

// GET all games
router.get("/", getGames);

// GET a single game
router.get("/:id", getGame);

// POST a new game
router.post("/", createGame);

// DELETE a game
router.delete("/:id", deleteGame);

// UPDATE a game
router.patch("/:id", updateGame);

// export games router
module.exports = router;
