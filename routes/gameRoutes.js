// express
const express = require("express");

// express router
const router = express.Router();

// middleware
const requireAuth = require("../middleware/requireAuth");
// const multer = require("multer");
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// destructured game controllers
const {
  getGames,
  getGame,
  createGame,
  deleteGame,
  updateGame,
  updateGameImg,
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

// UPDATE a game Image
router.patch("/image/:id", updateGameImg);

// export games router
module.exports = router;
