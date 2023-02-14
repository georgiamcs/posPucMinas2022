function createCrudRouter(ControllerClass, isAuteticado) {
  const express = require("express");
  const router = express.Router();
  const passport = require("passport");

  const autentRota = passport.authenticate("jwt", { session: false });
  const controller = new ControllerClass();

  const fnGetAll = controller.getAll;
  const fnGetById = controller.getById;
  const fnAdd = controller.add;
  const fnUpdate = controller.update;
  const fnDelete = controller.delete;

  if (isAuteticado) {
    router.get("/", autentRota, fnGetAll);
    router.get("/:id", autentRota, fnGetById);
    router.post("/", autentRota, fnAdd);
    router.put("/:id", autentRota, fnUpdate);
    router.delete("/:id", autentRota, fnDelete);
  } else {
    router.get("/", fnGetAll);
    router.get("/:id", fnGetById);
    router.post("/", fnAdd);
    router.put("/:id", fnUpdate);
    router.delete("/:id", fnDelete);    
  }

  return router;
}

module.exports = createCrudRouter;
