const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cookieParser = require("cookie-parser");
const { notFoundHandler, errorHandler } = require("./middleWares/common/errorHandler");
const port = process.env.PORT || 5000;

const app = express();
dotenv.config();

// database connection

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.6gfhdhg.mongodb.net/?retryWrites=true&w=majority`;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
    family: 4,
  })
  .then(() => console.log("database connection successfully"))
  .catch((error) => console.log(error));

//   request parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// parser cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

// router setup
// app.use("/");

// 404 not found handler
app.use(notFoundHandler);

// common error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`app listen port ${port}`);
});
