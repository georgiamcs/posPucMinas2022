const express = require("express");
const router = express.Router();
const controller = require("../controllers/AutenticacaoController");

//login
router.post("/jwt", controller.login);
router.post("/google", controller.loginGoogle);

module.exports = router;
