const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const { ServerApiVersion } = require("mongodb");
const cookieParser = require("cookie-parser");
const { notFoundHandler, errorHandler } = require("./middleWares/common/errorHandler");
const port = process.env.PORT || 5000;

/*-------------- routers ------------*/
const usersRouter = require("./routers/v1/usersRouter");
const loginRouter = require("./routers/v1/loginRouter");
const productRouter = require("./routers/v1/productRouter");
const orderRouter = require("./routers/v1/orderRouter");
const paymentRouter = require("./routers/v1/paymentRouter");
const blogRouter = require("./routers/v1/blogsRouter");

/*---------- express app initialization -----------*/
const app = express();
dotenv.config();
app.use(
  cors({
    crossDomain: true,
    credentials: true,
    exposedHeaders: ["Set-Cookie", "Date", "ETag"],
    origin: [
      "http://localhost:3000",
      "https://fresh-a3f88.web.app",
      "https://fresh-a3f88.firebaseapp.com",
      "https://sweet-dolphin-f5a740.netlify.app",
    ],
  })
);

/*------------ database connection --------------*/
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.6gfhdhg.mongodb.net/${process.env.APP_NAME}?retryWrites=true&w=majority`;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
    family: 4,
  })
  .then(() => console.log("database connection successfully"))
  .catch((error) => console.log(error));

/*------------- request parser -------------*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*---------- parser cookies  --------------*/
app.use(cookieParser(process.env.COOKIE_SECRET));

/*--------- router setup --------------*/
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/login", loginRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/payment", paymentRouter);
app.use("/api/v1/blog", blogRouter);

/*----------- 404 not found handler ----------*/
app.use(notFoundHandler);

/*--------- common error handler ----------*/
app.use(errorHandler);

/*---------- listen port ------------*/
app.listen(port, () => {
  console.log(`app listen port ${port}`);
});

/*--------- If no error is handled express -----------*/
// process.on("unhandledRejection", (error) => {

//   console.log(error.name, error.message);
//   app.close(() => {
//     process.exit(1);
//   });
// });
