const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const database = require('./config/database.config')
const cors =require("cors")
const apiRouter = require ("./routes/index.router");

const app = express();
//base de datos conectada
database.connect();

//logger request
app.use(logger('dev'));

//body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
//rutas estaticas
app.use(express.static(path.join(__dirname, 'public')));

//Api route
app.use("/api", apiRouter);



module.exports = app;
