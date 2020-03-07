/* eslint-disable no-console */
require(`dotenv`).config();
const express = require("express");
const mongoose = require(`mongoose`);
const morgan = require("morgan");
const path = require("path");
const app = express();

const PORT = process.env.SERVER_PORT || 3001;

app.use(morgan("dev"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

<<<<<<< HEAD
//Routes
const userRouter = require(`./routes/api/authRouter`);
const eventRouter = require(`./routes/api/eventRouter`);
app.use(`/auth`, userRouter);
app.use(`/event`, eventRouter);
=======

>>>>>>> Added mongoose initialization

if(process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
  });
}

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(() => {
  app.listen(PORT, () => {
      console.log(`Listening on http://localhost:${PORT}/`);
  });
}).catch(err => {
  if(err) throw err;
});

module.exports = app;
