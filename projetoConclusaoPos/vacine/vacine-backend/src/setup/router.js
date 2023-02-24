module.exports = {
  init: (app) => {
    const VacinaController = require("../controllers/crud/vacina.controller");
    const FornecedorController = require("../controllers/crud/fornecedor.controller");
    const UsuarioController = require("../controllers/crud/usuario.controller");
    const CompraVacinaController = require("../controllers/crud/compra-vacina.controller");
    const VacinacaoController = require("../controllers/crud/vacinacao.controller");    
    
    const createCrudRouter = require("../routers/generic-crud.router");

    const loginRouter = require("../routers/autenticacao.router");
    const clienteRouter = require("../routers/cliente.router");
    const tipoUsuarioRouter = require("../routers/tipo-usuario.router");        
    const vacinaRouter = createCrudRouter(VacinaController, true);
    const fornecedorRouter = createCrudRouter(FornecedorController, true);
    const usuarioRouter = createCrudRouter(UsuarioController, true);
    const compraVacinaRouter = createCrudRouter(CompraVacinaController, true);  
    const vacinacaoRouter = createCrudRouter(VacinacaoController, true);        

    app.use("/api/login", loginRouter);
    app.use("/api/vacinas", vacinaRouter);
    app.use("/api/fornecedores", fornecedorRouter);
    app.use("/api/usuarios/tipo", tipoUsuarioRouter);         
    app.use("/api/usuarios", usuarioRouter);
    app.use("/api/clientes", clienteRouter);    
    app.use("/api/compras-vacinas", compraVacinaRouter);          
    app.use("/api/vacinacoes", vacinacaoRouter);         
  },
};
