const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/dbConnection");
const { logger } = require("./middleware/logEvents");
const verifyJWT = require("./middleware/verifyJWT");
const PORT = process.env.PORT || 3000;
connectDB();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(logger);

app.get('/', (req ,res) => res.status(200).json('hello there')); 
app.use("/register", require("./routes/register"));
app.use("/user", require("./routes/user"));
app.use("/login", require("./routes/login"));
app.use("/logout", require("./routes/logout"));
app.use("/product", require("./routes/product"));
app.use("/deposit", require("./routes/deposit"));
app.use("/buy", require("./routes/buy"));
app.use("/reset", require("./routes/reset"));
app.use("*", require("./routes/notFound"));

mongoose.connection.once("open", () => {
  console.log("connected to mongodb");
  app.listen(PORT, () => console.log(`server is running on port: ${PORT}`));
});

