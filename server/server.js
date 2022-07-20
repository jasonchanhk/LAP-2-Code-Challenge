const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors("*"));
app.use(express.json());

const postRoutes = require("./controllers/posts");

app.use("/posts", postRoutes);

app.get("/", (req, res) =>
  res.json({ message: "Welcome to My little project!" })
);

module.exports = app;
