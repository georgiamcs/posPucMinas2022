const express = require("express");
const router = express.Router();
const ControllerClass = require("../controllers/crud/UsuarioController");

const controller = new ControllerClass();
const fnRegistrar = controller.registrar;
const fnTrocarSenha = controller.trocarsenha;

router.post("/registrar", fnRegistrar);
router.post("/trocarsenha", fnTrocarSenha);

module.exports = router;
