
const GenericCrudController = require("./generic-crud.controller");
const GenericCrudService = require("../../services/generic-crud.service");
const VacinaModel = require("../../models/vacina.model");
const CompraVacinaModel = require("../../models/compra-vacina.model");
const ControleEstoqueVacinaController = require("../../controllers/crud/controle-estoque-vacina.controller");
const Acesso = require("../../setup/acesso");
const ControleEstoqueVacina = require("../../classes/controle-estoque-vacina.class");
const cnst = require("../../constantes");

class VacinaController extends GenericCrudController {
  constructor() {
    super(GenericCrudService, VacinaModel, Acesso.TEMA_ACESSO.VACINA);
  }

  createObj(obj, user) {
    let vacina = {};
    vacina.nome = obj.nome;
    vacina.protecao_contra = obj.protecao_contra;
    vacina.composicao = obj.composicao;
    vacina.qtd_doses_estoque = obj.qtd_doses_estoque;
    vacina.vl_atual_unit_dose = obj.vl_atual_unit_dose;
    vacina.justificativa_alt_estoque = obj.justificativa_alt_estoque; //vai ser usado no controle de estoque

    // se id for nulo ou undefined, i.e, obj sendo criado, define o estoque
    // caso contrario, so pela funcionalidade de atualizar estoque
    if (!!!obj._id) {
      vacina.qtd_doses_estoque = obj.qtd_doses_estoque;
    }

    return vacina;
  }

  createObjAtualizaEstoque(obj) {
    let vacina = {};
    vacina.qtd_doses_estoque = obj.qtd_doses_estoque;
    return vacina;
  }

  async temDuplicado(obj, session, tipoOperacao) {
    let regBase = [];

    if (!!obj.nome) {
      let searchTerm = obj.nome.trim();

      // TENTATIVAS DE FAZER CASE INSENSITIVE
      // regBase = await VacinaService.find(VacinaModel, {
      //   nome: { $regex: `/${searchTerm}/i` }
      // });
      // regBase = await VacinaService.find(VacinaModel, {
      //   nome: { $regex: new RegExp(searchTerm, "i") },
      // });
      if (tipoOperacao === cnst.TIPO_OPERACAO.INSERT) {
        regBase = await GenericCrudService.find(
          VacinaModel,
          {
            nome: searchTerm,
            _id: { $ne: obj._id },
          },
          session,
          "_id"
        );
      } else if (tipoOperacao === cnst.TIPO_OPERACAO.UPDATE) {
        regBase = await GenericCrudService.find(
          VacinaModel,
          {
            nome: searchTerm,
          },
          session,
          "_id"
        );
      }
    }
    return regBase.length > 0;
  }

  async podeExcluir(id, session) {
    const comprasDaVacina = await GenericCrudService.getAll(
      CompraVacinaModel,
      session,
      {
        "itens_compra.vacina._id": id,
      },
      "_id"
    );

    return comprasDaVacina.length == 0;
  }

  async doOnAdd(regAdicionado, user, session) {
    let estoqueController = new ControleEstoqueVacinaController();

    const regContEstoque = new ControleEstoqueVacina(
      { _id: regAdicionado._id, nome: regAdicionado.nome },
      { _id: user._id, nome: user.nome },
      new Date(),
      cnst.TIPO_EVENTO_CONTROLE_ESTOQUE.ENTRADA,
      cnst.TIPO_MOTIVO_CONTROLE_ESTOQUE.CADASTRO_INICIAL,
      null,
      regAdicionado._id,
      0,
      regAdicionado.qtd_doses_estoque
    );
    await estoqueController.inserirFromRecord(regContEstoque, session);
  }

  async doOnDelete(id, objBeforeDelete, objDeleted, user, session) {
    let estoqueController = new ControleEstoqueVacinaController();
    await estoqueController.excluirCascataVacina(id, session);
  }

  async doOnUpdate(id, objBeforeUpdate, objUpdated, user, session) {

    if (objBeforeUpdate.qtd_doses_estoque != objUpdated.qtd_doses_estoque) {
      const tipoEvento =
        objBeforeUpdate.qtd_doses_estoque <= objUpdated.qtd_doses_estoque
          ? cnst.TIPO_EVENTO_CONTROLE_ESTOQUE.ENTRADA
          : cnst.TIPO_EVENTO_CONTROLE_ESTOQUE.SAIDA;

      // insere registro de controle de estoque
      let estoqueController = new ControleEstoqueVacinaController();

      const regContEstoque = new ControleEstoqueVacina(
        { _id: id, nome: objUpdated.nome }, //vacina
        { _id: user._id, nome: user.nome }, //usuario
        new Date(), // data_evento
        tipoEvento, //tipo_evento
        cnst.TIPO_MOTIVO_CONTROLE_ESTOQUE.AJUSTE_ESTOQUE, //tipo_motivo,
        objUpdated.justificativa_alt_estoque, //descricao_evento
        id, //id_entidade_relac_evento
        objBeforeUpdate.qtd_doses_estoque, //qtd_estoque_antes
        objUpdated.qtd_doses_estoque //qtd_estoque_depois
      );

      await estoqueController.inserirFromRecord(regContEstoque, session);
    }
  }

}

module.exports = VacinaController;
