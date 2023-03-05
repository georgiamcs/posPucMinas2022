const express = require("express");
const router = express.Router();
const passport = require("passport");
const Controller = require("../controllers/crud/usuario.controller");

const autentRota = passport.authenticate("jwt", { session: false });
const control = new Controller();

const fnGetAll = control.getAll;
const fnGetById = control.getById;
const fnAdd = control.add;
const fnUpdate = control.update;
const fnDelete = control.delete;
const fnGetdByTipos = control.getByTipos;

router.get("/getByTipos/", autentRota, fnGetdByTipos);
router.get("/", autentRota, fnGetAll);
router.get("/:id", autentRota, fnGetById);
router.post("/", autentRota, fnAdd);
router.put("/:id", autentRota, fnUpdate);
router.delete("/:id", autentRota, fnDelete);


module.exports = router;
