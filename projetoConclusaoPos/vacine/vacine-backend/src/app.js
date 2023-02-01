const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.use(
  express.urlencoded({
    extended: true,
  })
);

const indexRoute  = require("./routers/indexRouter");
const indexVacina = require("./routers/vacinaRouter");

app.use("/", indexRoute);
app.use("/vacinas", indexVacina);

module.exports = app;