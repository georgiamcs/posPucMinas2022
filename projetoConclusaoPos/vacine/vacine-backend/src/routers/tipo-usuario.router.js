const express = require("express");
const UsuarioController = require("../controllers/crud/usuario.controller");
const passport = require("passport");
const router = express.Router();

const controller = new UsuarioController();

const autentRota = passport.authenticate("jwt", { session: false });

router.get("/:tipo", autentRota, controller.getByTipo);

module.exports = router;
