const express = require("express");
const router = express.Router();
const passport = require("passport");
const ControllerVacina = require("../controllers/crud/vacina.controller");
const ControllerEstoque = require("../controllers/crud/controle-estoque-vacina.controller");

const autentRota = passport.authenticate("jwt", { session: false });
const controllerVacina = new ControllerVacina();
const controllerEstoque = new ControllerEstoque();

const fnGetAll = controllerVacina.getAll;
const fnGetById = controllerVacina.getById;
const fnAdd = controllerVacina.add;
const fnUpdate = controllerVacina.update;
const fnDelete = controllerVacina.delete;
const fnContEstoque = controllerEstoque.getByIdVacina;

router.get("/", autentRota, fnGetAll);
router.get("/:id", autentRota, fnGetById);
router.post("/", autentRota, fnAdd);
router.put("/:id", autentRota, fnUpdate);
router.delete("/:id", autentRota, fnDelete);

router.get("/controle-estoque/:id", autentRota, fnContEstoque);

module.exports = router;
