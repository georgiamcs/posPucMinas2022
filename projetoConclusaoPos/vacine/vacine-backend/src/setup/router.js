module.exports = {
  init: (app) => {
    const FornecedorController = require("../controllers/crud/fornecedor.controller");
    const CompraVacinaController = require("../controllers/crud/compra-vacina.controller");
    const VacinacaoController = require("../controllers/crud/vacinacao.controller");
    const DescarteVacinaController = require("../controllers/crud/descarte-vacina.controller");
    const express = require("express");
    const path = require("path");
    const yaml = require("js-yaml");
    const swaggerUi = require("swagger-ui-express");
    const fs = require("fs");    

    const createCrudRouter = require("../routers/create-generic-crud-router.util");

    const loginRouter = require("../routers/autenticacao.router");
    const clienteRouter = require("../routers/cliente.router");
    const vacinaRouter = require("../routers/vacina.router");
    const usuarioRouter = require("../routers/usuario.router");
    const fornecedorRouter = createCrudRouter(FornecedorController, true);
    const compraVacinaRouter = createCrudRouter(CompraVacinaController, true);
    const vacinacaoRouter = createCrudRouter(VacinacaoController, true);
    const descarteVacinaRouter = createCrudRouter(
      DescarteVacinaController,
      true
    );

    app.use("/api/autenticacao", loginRouter);
    app.use("/api/vacinas", vacinaRouter);
    app.use("/api/fornecedores", fornecedorRouter);
    app.use("/api/usuarios", usuarioRouter);
    app.use("/api/clientes", clienteRouter);
    app.use("/api/compras-vacinas", compraVacinaRouter);
    app.use("/api/vacinacoes", vacinacaoRouter);
    app.use("/api/descarte-vacinas", descarteVacinaRouter);

    //Levantando o swagger
    const swaggerDocument = yaml.load(
      fs.readFileSync(path.join(__dirname, "../", "api-swagger.yaml"), "utf8")
    );
    app.use("/api-swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    //Levantando o angular
    app.use(
      express.static(
        path.join(__dirname, "../../../vacine-frontend/dist", "vacine")
      )
    );
    app.get("/*", function (req, res) {
      res.sendFile(
        path.join(
          __dirname,
          "../../../vacine-frontend/dist",
          "vacine",
          "index.html"
        )
      );
    });
  },
};
