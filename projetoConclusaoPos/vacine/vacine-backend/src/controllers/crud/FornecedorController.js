const GenericCrudController = require("./GenericCrudController");
const FornecedorService = require("../../services/GenericCrudService");
const FornecedorModel = require("../../models/FornecedorModel");
const cnst = require("../../constantes");

const perfisRequeridosFornecedor = [
  cnst.PERFIS.ADMINISTRADOR,
  cnst.PERFIS.CADASTRADOR_COMPRA,
  cnst.PERFIS.CADASTRADOR_FORNECEDOR,
];

function createFornecedor(obj) {
  let fornecedor = {};

  fornecedor.nome = obj.nome;
  fornecedor.email = obj.email;
  fornecedor.cnpj = obj.cnpj;
  fornecedor.endereco = obj.endereco;
  fornecedor.tel_celular = obj.tel_celular;
  fornecedor.tel_fixo = obj.tel_fixo;

  return fornecedor;
}
class FornecedorController extends GenericCrudController {
  constructor() {
    super(
      FornecedorService,
      FornecedorModel,
      perfisRequeridosFornecedor,
      createFornecedor
    );
  }
}

module.exports = FornecedorController;
