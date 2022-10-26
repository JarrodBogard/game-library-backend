// game model
const Game = require("../models/Game");

// mongoose library
const mongoose = require("mongoose");

// get all games
/*
const getGames = async (req, res) => {
  //   const user_id = req.user._id;

  const games = await Game.find({}).sort({ createdAt: -1 });
  // add user_id to find method with auth

  res.status(200).json(games);
};
*/

// controller for users that like/favorite games
const getGames = async (req, res) => {
  const user_id = req.user._id;
  const games = await Game.find({ user_id }).sort({ createdAt: -1 });
  res.status(200).json(games);
};

// get a single game
const getGame = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid ID" });
  }

  const game = await Game.findOne({ id });

  if (!game) {
    return res.status(400).json({ error: "Game not found" });
  }

  res.status(200).json(game);
};

const createGame = async (req, res) => {
  const { title, price, release_date } = req.body;

  let emptyFields = [];
  if (!title) emptyFields.push("title");
  if (!price) emptyFields.push("price");
  if (!release_date) emptyFields.push("release_date");
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }

  //   add document to database
  try {
    const user_id = req.user._id;
    const game = await Game.create({ title, price, release_date, user_id });
    res.status(200).json(game);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a game
const deleteGame = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid ID" });
  }

  const game = await Game.findOneAndDelete({ _id: id });

  if (!game) {
    return res.status(400).json({ error: "Game not found" });
  }

  res.status(200).json(game);
};

// update a game

const updateGame = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid ID" });
  }

  const game = await Game.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!game) {
    res.status(400).json({ error: "Game not found" });
  }

  res.status(200).json(game);
};

// update image for a game

const updateGameImg = async (req, res) => {
  const { id } = req.params;

  console.log(req.file, "---- req file ----");
  try {
    if (!req.file) {
      res.status(400).json({ error: "Must enter a file" });
    } else {
      let imageUpload = {
        file: {
          data: req.file.buffer,
          contentType: req.file.mimetype,
        },
        fileName: req.file.originalname,
      };
      console.log(imageUpload, "---- image upload ----");
      const game = await Game.findOneAndUpdate({ _id: id }, { ...imageUpload });
      const updatedGame = await game.save();
      console.log(updatedGame, "---- updated game ----");
      res.status(200).json(updatedGame);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// export game controllers
module.exports = {
  getGames,
  getGame,
  createGame,
  deleteGame,
  updateGame,
  updateGameImg,
};
