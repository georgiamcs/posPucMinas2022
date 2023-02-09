const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.use(
  express.urlencoded({
    extended: true,
  })
);

const indexRoute      = require("./routers/IndexRouter");
const indexVacina     = require("./routers/VacinaRouter");
const indexFornecedor = require("./routers/FornecedorRouter");
const indexUsuario    = require("./routers/UsuarioRouter");

app.use("/", indexRoute);
app.use("/vacinas", indexVacina);
app.use("/fornecedores", indexFornecedor);
app.use("/usuarios", indexUsuario);

module.exports = app;