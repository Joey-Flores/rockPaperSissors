const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const MongoStore = require("connect-mongo");
const app = express();

const User = require("./models/user");

//Mongodb
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3001;

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

const secret = process.env.SECRET || "thisisasecret";

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret,
  },
  touchAfter: 24 * 60 * 60, //This is a lazy session update
});

store.on("error", function (e) {
  console.log("SESSION STORE ERROR!", e);
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
    // store,
    secret: secret,
    resave: true,
    saveUninitialized: true,
    cookie: {
      // httpOnly: true, // This makes our cookie only accessable thorugh http NOT javascript
      // secure: true, // only works over a https connection, SHOULD BE ENABLED when site is live. ***********
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // Since date.now() returns miliseconds, we need to calculate how many miliseconds are in a week. Because that is when we want this cookie to expire
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

app.use(cookieParser(secret));

//Passport
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

app.post("/login", async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("No User exists/Incorrect Password");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send(["Successfully Authenticated", req.user]);
        // req.session.name = req.cookies;
        // console.log(req.cookies.connect.sid);
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
