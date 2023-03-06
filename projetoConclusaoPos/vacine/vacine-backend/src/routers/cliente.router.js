const express = require("express");
const passport = require("passport");
const ControllerClass = require("../controllers/crud/usuario.controller");

const router = express.Router();
const controller = new ControllerClass();
const fnRegistrar = controller.registrar;

router.post("/registrar", fnRegistrar);

module.exports = router;
