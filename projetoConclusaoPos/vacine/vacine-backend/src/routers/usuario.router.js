const express = require("express");
const router = express.Router();
const passport = require("passport");
const Controller = require("../controllers/crud/usuario.controller");
const ControllerVacinacao = require("../controllers/crud/vacinacao.controller");

const autentRota = passport.authenticate("jwt", { session: false });
const control = new Controller();
const controllerVac = new ControllerVacinacao();

const fnGetAll = control.getAll;
const fnGetById = control.getById;
const fnAdd = control.add;
const fnUpdate = control.update;
const fnDelete = control.delete;
const fnGetdByTipos = control.getByTipos;
const fnTrocarSenha = control.trocarsenha;
const fnNomeById = control.getNomeById;
const fnMinhasVacinacoes = controllerVac.getVacinacoesUsuario;


router.get("/getByTipos", autentRota, fnGetdByTipos); // tem que estar primeiro  para nao entrar na rota de id
router.post("/", autentRota, fnAdd);
router.get("/:id", autentRota, fnGetById);
router.put("/:id", autentRota, fnUpdate);
router.delete("/:id", autentRota, fnDelete);
router.put("/trocarsenha/:id", autentRota, fnTrocarSenha);
router.get("/nome/:id", autentRota, fnNomeById);
router.get("/vacinacoes/:id", autentRota, fnMinhasVacinacoes);
router.get("/", autentRota, fnGetAll);


module.exports = router;
