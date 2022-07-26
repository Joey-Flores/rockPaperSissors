const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

//Mongodb
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

//Middleware

// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(cookieParser(process.env.SESSION_SECRET || "secret"));

//Passport
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

app.get("/api", (req, res) => {
  res.json({ message: "Test" });
});

app.post("/login", async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("No User exists/Incorrect Password");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send(["Successfully Authenticated", req.user]);
        console.log(req.user);
      });
    }
  })(req, res, next);
});

app.post("/logout", async (req, res) => {
  req.logout(function (err) {
    if (err) throw err;
    res.send("Logout");
  });
});

app.post("/register", async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const exists = await User.exists({ username: username });
    if (exists) {
      return res.send("This user already exists");
    }

    const hashedPW = await bcrypt.hash(password, 10);

    const user = new User({ username: username, password: hashedPW });
    await user.save();
    req.logIn(user, (err) => {
      if (err) throw err;
      res.send(["User Created", req.user]);
      console.log(req.user);
    });
  } catch {
    console.log(error);
  }
});

app.post("/score", async (req, res) => {
  const result = await req.body.score;
  const id = await req.body.id;
  console.log(id);
  if (result === "WIN") {
    console.log("you win");
    await User.findOneAndUpdate(
      { _id: id },
      { $inc: { "stats.totalGames": 1, "stats.totalWins": 1 } }
    );
  } else if (result === "LOSE") {
    console.log("you lose");
    await User.findOneAndUpdate(
      { _id: id },
      { $inc: { "stats.totalGames": 1, "stats.totalLosses": 1 } }
    );
  } else {
    console.log("you tied");
    await User.findOneAndUpdate(
      { _id: id },
      { $inc: { "stats.totalGames": 1, "stats.totalTies": 1 } }
    );
  }
  res.send("game counted");
  console.log(req.body);
});

app.get("/account", (req, res) => {
  res.send(req.user);
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
