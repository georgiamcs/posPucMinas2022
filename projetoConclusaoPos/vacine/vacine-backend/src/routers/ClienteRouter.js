const express = require("express");
const passport = require("passport");
const ControllerClass = require("../controllers/crud/UsuarioController");

const router = express.Router();

const controller = new ControllerClass();
const fnRegistrar = controller.registrar;
const fnTrocarSenha = controller.trocarsenha;
const fnNomeById = controller.getNomeById;

const autentRota = passport.authenticate("jwt", { session: false });

router.post("/registrar", fnRegistrar);
router.put("/trocarsenha/:id", autentRota, fnTrocarSenha);
router.get("/nome/:id", autentRota, fnNomeById);

module.exports = router;
