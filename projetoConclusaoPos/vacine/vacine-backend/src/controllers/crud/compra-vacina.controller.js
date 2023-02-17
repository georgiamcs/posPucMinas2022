const GenericCrudController = require("./generic-crud.controller");
const CompraVacinaService = require("../../services/generic-crud.service");
const CompraVacinaModel = require("../../models/compra-vacina.model");
const Acesso = require("../../setup/acesso");

function createNovoRegistro(obj) {
  let registro = {};

  registro.fornecedor_id = obj.fornecedor_id;
  registro.fornecedor_nome = obj.fornecedor_nome;
  registro.fornecedor_cnpj = obj.fornecedor_cnpj;
  registro.nota_fiscal = obj.nota_fiscal;
  registro.data_compra = obj.data_compra;
  registro.itens_compra = obj.itens_compra;
  registro.vl_total_compra = obj.vl_total_compra;

  return registro;
}
class CompraVacinaController extends GenericCrudController {
  constructor() {
    const perfisRequeridosCompraVacina = Acesso.getPerfisPorTema(Acesso.TEMA.COMPRA_VACINA);

    super(
      CompraVacinaService,
      CompraVacinaModel,
      perfisRequeridosCompraVacina,
      createNovoRegistro
    );
  }
}

module.exports = CompraVacinaController;
