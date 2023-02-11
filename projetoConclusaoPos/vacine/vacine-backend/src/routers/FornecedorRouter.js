const express = require("express");
const router = express.Router();
const passport = require("passport");
const FornecedorController = require("../controllers/crud/FornecedorController");

const autentRota = passport.authenticate("jwt", { session: false });
const controller = new FornecedorController();

fnGetAll  = controller.getAll;
fnGetById = controller.getById;
fnAdd     = controller.add;
fnUpdate  = controller.update;
fnDelete  = controller.delete;

router.get("/", autentRota, fnGetAll);
router.get("/:id", autentRota, fnGetById);
router.post("/", autentRota, fnAdd);
router.put("/:id", autentRota, fnUpdate);
router.delete("/:id", autentRota, fnDelete);

module.exports = router;
