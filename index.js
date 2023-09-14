const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authorRouter = require('./routes/author')
const bookRouter = require('./routes/book')

dotenv.config();
const app = express();

// CONNECT DATABASE
connectDB();

// parse json
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(morgan("common")); // thong bao o terminal

// ROUTES
app.use('/v1/author', authorRouter)
app.use('/v1/book', bookRouter)

app.listen(8000, () => {
    console.log("server is running...");
});
