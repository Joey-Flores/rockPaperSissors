const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3001;
const app = express();

const User = require("./models/user");

const dbUrl =
  process.env.DB_USER || "mongodb://localhost:27017/rock_paper_scissors";

mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("Mongo Connection Open!");
  })
  .catch((e) => {
    console.log("THERE WAS A MONGO CONNECTION ERROR");
    console.log(e);
  });

app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  res.json({ message: "Test" });
});

app.post("/register", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = new User({ username: username, password: password });
  await user.save();
});

app.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(username, password);

  const user = new User({ username: username, password: password });
  await user.save();
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
