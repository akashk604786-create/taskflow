// Environment Variables
require('dotenv').config();

// External Module
const express = require('express');
const cors = require('cors');

// Local Module
const todoItemsRouter = require("./routes/todoItemsRouter");
const authRouter = require("./routes/authRouter");
const errorsController = require("./controllers/errors");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/todo", todoItemsRouter);

app.use(errorsController.pageNotFound);
app.use(errorsController.handleError);

module.exports = app;
