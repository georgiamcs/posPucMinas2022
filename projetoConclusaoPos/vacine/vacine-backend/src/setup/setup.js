const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const PassportStrategy = require("../lib/autenticacao/passaport.lib");
const path = require("path");

module.exports = {
  init: (app) => {
    //set up application middlewares
    app.use(express.json());
    app.use(cors());
    app.use(
      express.urlencoded({
        extended: true,
      })
    );
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    // Apply strategy to passport
    PassportStrategy.applyPassportStrategy(passport);


  },
};