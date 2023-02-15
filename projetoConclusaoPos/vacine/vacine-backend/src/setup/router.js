module.exports = {
  init: (app) => {
    const VacinaController = require("../controllers/crud/VacinaController");
    const FornecedorController = require("../controllers/crud/FornecedorController");
    const UsuarioController = require("../controllers/crud/UsuarioController");
    const CompraVacinaController = require("../controllers/crud/CompraVacinaController");
    
    const createCrudRouter = require("../routers/GenericCrudRouter");

    const loginRouter = require("../routers/AutenticacaoRouter");
    const clienteRouter = require("../routers/ClienteRouter");
    const vacinaRouter = createCrudRouter(VacinaController, true);
    const fornecedorRouter = createCrudRouter(FornecedorController, true);
    const usuarioRouter = createCrudRouter(UsuarioController, true);
    const compraVacinaRouter = createCrudRouter(CompraVacinaController, true);    

    app.use("/api/login", loginRouter);
    app.use("/api/vacinas", vacinaRouter);
    app.use("/api/fornecedores", fornecedorRouter);
    app.use("/api/usuarios", usuarioRouter);
    app.use("/api/cliente", clienteRouter);    
    app.use("/api/compra-vacina", compraVacinaRouter);       
  },
};
