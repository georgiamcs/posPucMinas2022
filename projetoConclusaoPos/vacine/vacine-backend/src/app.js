const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const PassportStrategy = require("./lib/autenticacao/Passaport");
const passport = require("passport");

// Apply strategy to passport
PassportStrategy.applyPassportStrategy(passport);

const app = express();

// Set up app
app.use(express.json());
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// API Route
const indexRouter      = require("./routers/IndexRouter");
const loginRouter      = require("./routers/AutenticacaoRouter");
const vacinaRouter     = require("./routers/VacinaRouter");
const fornecedorRouter = require("./routers/FornecedorRouter");
const usuarioRouter    = require("./routers/UsuarioRouter");

app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/vacinas", vacinaRouter);
app.use("/fornecedores", fornecedorRouter);
app.use("/usuarios", usuarioRouter);

module.exports = app;