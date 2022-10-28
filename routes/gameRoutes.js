// express
const express = require("express");

// express router
const router = express.Router();

// middleware
const requireAuth = require("../middleware/requireAuth");

const multer = require("multer");

//////////////////// diskStorage //////////////////////////
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads");
//   },
//   filename: function (req, file, cb) {
//     // add element to filename to retrieve image for specific game
//     console.log(file, file.filename, file.originalname, "file on router");
//     cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
//     cb(null, true);
//   } else cb(new Error("Unable to process file type"), false);
// };

// const upload = multer({
//   storage,
//   limits: {
//     fileSize: 1024 * 1024 * 2,
//   },
//   fileFilter,
// });
/////////////////////////////////////////////////////////////

const storage = multer.memoryStorage();
const upload = multer({ storage });

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
router.post("/", upload.single("file"), createGame);

// DELETE a game
router.delete("/:id", deleteGame);

// UPDATE a game
router.patch("/:id", updateGame);

// UPDATE a game Image
router.put("/image/:id", upload.single("file"), updateGameImg);

// export games router
module.exports = router;
