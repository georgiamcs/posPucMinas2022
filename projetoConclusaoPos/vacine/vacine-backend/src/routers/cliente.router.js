const express = require("express");
const passport = require("passport");
const ControllerClass = require("../controllers/crud/usuario.controller");
const ControllerVacinacao = require("../controllers/crud/vacinacao.controller");

const router = express.Router();

const controller = new ControllerClass();
const controllerVac = new ControllerVacinacao();

const fnRegistrar = controller.registrar;
const fnTrocarSenha = controller.trocarsenha;
const fnNomeById = controller.getNomeById;
const fnMinhasVacinacoes = controllerVac.getVacinacoesUsuario;

const autentRota = passport.authenticate("jwt", { session: false });

router.post("/registrar", fnRegistrar);
router.put("/trocarsenha/:id", autentRota, fnTrocarSenha);
router.get("/nome/:id", autentRota, fnNomeById);
router.get("/vacinacoes/:id", autentRota, fnMinhasVacinacoes);

module.exports = router;
