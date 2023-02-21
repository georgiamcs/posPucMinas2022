const GenericCrudController = require("./generic-crud.controller");
const GenericService = require("../../services/generic-crud.service");
const FornecedorModel = require("../../models/fornecedor.model");
const CompraVacinaModel = require("../../models/compra-vacina.model");
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
    regBase = await GenericService.find(FornecedorModel, {
      $or: [{ nome: searchNome }, { email: searchEmail }, { cnpj: searchCNPJ }],
      _id: { $ne: obj._id },
    });
  } else {
    regBase = await GenericService.find(FornecedorModel, {
      $or: [{ nome: searchNome }, { email: searchEmail }, { cnpj: searchCNPJ }],
    });
  }
  return regBase.length > 0;
}

async function podeExcluir(id, session) {
  const comprasDoFornecedor = await GenericService.getAll(
    CompraVacinaModel,
    session,
    {
      "fornecedor._id": id,
    },
    "_id"
  );

  return comprasDoFornecedor.length == 0;
}

class FornecedorController extends GenericCrudController {
  constructor() {
    const perfisRequeridosFornecedor = Acesso.getPerfisPorTema(
      Acesso.TEMA.FORNECEDOR
    );

    super(
      GenericService,
      FornecedorModel,
      perfisRequeridosFornecedor,
      createFornecedor,
      existeDuplicado,
      podeExcluir
    );
  }
}

module.exports = FornecedorController;
