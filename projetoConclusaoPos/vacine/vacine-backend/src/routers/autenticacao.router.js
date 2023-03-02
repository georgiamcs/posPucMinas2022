const express = require("express");
const router = express.Router();
const controller = require("../controllers/autenticacao.controller");

//login
router.post("/jwt", controller.loginJwt);
router.post("/google", controller.loginGoogle);

module.exports = router;
