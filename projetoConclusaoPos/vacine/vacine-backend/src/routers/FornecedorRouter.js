const express = require("express");
const router = express.Router();
const passport = require("passport");
const controller = require("../controllers/FornecedorController");

const autentRota = passport.authenticate("jwt", { session: false });

router.get("/", autentRota, controller.getAll);
router.get("/:id", autentRota, controller.get);
router.post("/", autentRota, controller.add);
router.put("/:id", autentRota, controller.update);
router.delete("/:id", autentRota, controller.delete);

module.exports = router;
