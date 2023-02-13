function createCrudRouter(ControllerClass, isAuteticado) {
  const express = require("express");
  const router = express.Router();
  const passport = require("passport");

  const autentRota = isAuteticado
    ? passport.authenticate("jwt", { session: false })
    : null;
  const controller = new ControllerClass();
  
  const fnGetAll = controller.getAll;
  const fnGetById = controller.getById;
  const fnAdd = controller.add;
  const fnUpdate = controller.update;
  const fnDelete = controller.delete;

  router.get("/", autentRota, fnGetAll);
  router.get("/:id", autentRota, fnGetById);
  router.post("/", autentRota, fnAdd);
  router.put("/:id", autentRota, fnUpdate);
  router.delete("/:id", autentRota, fnDelete);

  return router;
}

module.exports = createCrudRouter;
