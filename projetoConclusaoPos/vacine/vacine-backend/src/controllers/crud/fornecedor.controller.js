const GenericCrudController = require("./generic-crud.controller");
const FornecedorService = require("../../services/generic-crud.service");
const FornecedorModel = require("../../models/fornecedor.model");
const Acesso = require("../../setup/acesso");

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

async function existeDuplicado(obj) {
  searchNome = obj.nome.trim();
  searchEmail = obj.email.trim();
  searchCNPJ = obj.cnpj.trim();

  if (!!obj._id) {
    regBase = await FornecedorService.find(FornecedorModel, {
      $or: [{ nome: searchNome }, { email: searchEmail }, { cnpj: searchCNPJ }],
      _id: { $ne: obj._id },
    });
  } else {
    regBase = await FornecedorService.find(FornecedorModel, {
      $or: [{ nome: searchNome }, { email: searchEmail }, { cnpj: searchCNPJ }],
    });
  }
  return regBase.length > 0;
}

class FornecedorController extends GenericCrudController {
  constructor() {
    const perfisRequeridosFornecedor = Acesso.getPerfisPorTema(
      Acesso.TEMA.FORNECEDOR
    );

    super(
      FornecedorService,
      FornecedorModel,
      perfisRequeridosFornecedor,
      createFornecedor,
      existeDuplicado
    );
  }
}

module.exports = FornecedorController;
