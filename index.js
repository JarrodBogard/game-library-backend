// config
require("dotenv").config();

// express
const express = require("express");
const app = express();

// mongoose library
const mongoose = require("mongoose");

// cross-origin resource sharing
const cors = require("cors");

// import routes
const gameRoutes = require("./routes/gameRoutes");
const userRoutes = require("./routes/userRoutes");

// middleware
app.use(cors());
app.use(express.json());

// port
const PORT = process.env.PORT || 5000;

// server home page
app.get("/", (req, res) => {
  res.send("Home Page");
});

app.use("/api/games", gameRoutes);
app.use("/api/users", userRoutes);

// connect to database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(PORT, () =>
      console.log(`Listening on port: http://localhost:${PORT}`)
    );
  })
  .catch((error) => {
    console.log(error);
  });
