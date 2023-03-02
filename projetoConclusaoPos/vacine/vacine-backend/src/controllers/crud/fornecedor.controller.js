const cnst = require("../../constantes");
const GenericCrudController = require("./generic-crud.controller");
const GenericService = require("../../services/generic-crud.service");
const FornecedorModel = require("../../models/fornecedor.model");
const CompraVacinaModel = require("../../models/compra-vacina.model");
const Acesso = require("../../setup/acesso");

class FornecedorController extends GenericCrudController {
  constructor() {
    super(
      GenericService,
      FornecedorModel,
      Acesso.TEMA_ACESSO.FORNECEDOR_VACINA
    );
  }

  createObj(obj, user) {
    let fornecedor = {};

    fornecedor.nome = obj.nome;
    fornecedor.email = obj.email;
    fornecedor.cnpj = obj.cnpj;
    fornecedor.endereco = obj.endereco;
    fornecedor.tel_celular = obj.tel_celular;
    fornecedor.tel_fixo = obj.tel_fixo;

    return fornecedor;
  }

  async temDuplicado(obj, session, tipoOperacao) {
    let searchNome = obj.nome.trim();
    let searchEmail = obj.email.trim();
    let searchCNPJ = obj.cnpj.trim();

    let regBase = [];

    if (tipoOperacao === cnst.TIPO_OPERACAO.INSERT) {
      regBase = await GenericService.find(
        FornecedorModel,
        {
          $or: [
            { nome: searchNome },
            { email: searchEmail },
            { cnpj: searchCNPJ },
          ],
          _id: { $ne: obj._id },
        },
        session,
        "_id"
      );
    } else if (tipoOperacao === cnst.TIPO_OPERACAO.UPDATE) {
      regBase = await GenericService.find(
        FornecedorModel,
        {
          $or: [
            { nome: searchNome },
            { email: searchEmail },
            { cnpj: searchCNPJ },
          ],
        },
        session,
        "_id"
      );
    }
    return regBase.length > 0;
  }

  async podeExcluir(id, session) {
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
}

module.exports = FornecedorController;
