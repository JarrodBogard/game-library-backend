// mongoose library
const mongoose = require("mongoose");

// mongoose schema property
const Schema = mongoose.Schema;

// schema to create game documents
const gameSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    release_date: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// exporting game model
module.exports = mongoose.model("Game", gameSchema);
