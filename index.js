const config = require("config");
const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const questions = require("./routes/questions");
const answers = require("./routes/answers");
const users = require("./routes/users");
const auth = require("./routes/auth");
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const { APP_USER, APP_USER_PASSWORD } = process.env;

if (!config.get("jwtPrivateKey")) {
  console.log("FATAL ERROR: jwtPrivateKey is not defined");
  process.exit(1);
}

mongoose
  .connect(
    `mongodb+srv://${APP_USER}:${APP_USER_PASSWORD}@quoraclone.9st0h.mongodb.net/QuoraClone?retryWrites=true&w=majority`,
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(cors());
mongoose.set("useFindAndModify", false);

app.use("/api/questions", questions);
app.use("/api/answers", answers);
app.use("/api/users", users);
app.use("/api/auth", auth);

const port = process.env.PORT || 5000;
if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => console.log("listening to port 5000"));
