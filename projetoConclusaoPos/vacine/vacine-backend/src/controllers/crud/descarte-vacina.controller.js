const GenericCrudController = require("./generic-crud.controller");
const ControleEstoqueVacinaController = require("./controle-estoque-vacina.controller");
const genericService = require("../../services/generic-crud.service");
const DescarteVacinaModel = require("../../models/descarte-vacina.model");
const Acesso = require("../../setup/acesso");
const ControleEstoqueVacina = require("../../classes/controle-estoque-vacina.class");
const modelVacina = require("../../models/vacina.model");
const cnst = require("../../constantes");

class DescarteVacinaController extends GenericCrudController {
  constructor() {


    super(
      genericService,
      DescarteVacinaModel,
      Acesso.TEMA_ACESSO.DESCARTE_VACINA
    );
  }

  createObj(obj, user) {
    let registro = {};
    registro.codigo = obj.codigo;
    registro.usuario_resp_descarte = obj.usuario_resp_descarte;
    registro.data_descarte = obj.data_descarte;
    registro.motivo_descarte = obj.motivo_descarte;    
    registro.justificativa_descarte = obj.justificativa_descarte;          
    registro.local_descarte = obj.local_descarte;
    registro.itens_descarte = obj.itens_descarte;

    return registro;
  }

  async temDuplicado(obj, session, tipoOperacao) {
    let searchCodigo = obj.codigo;
    let regBase = [];

    if (tipoOperacao === cnst.TIPO_OPERACAO.INSERT) {
      regBase = await genericService.find(
        DescarteVacinaModel,
        {
          codigo: { $regex: searchCodigo, $options: "i" }
        },
        session,
        "_id"
      );
    } else if (tipoOperacao === cnst.TIPO_OPERACAO.UPDATE) {
      regBase = await genericService.find(
        DescarteVacinaModel,
        {
          codigo: { $regex: searchCodigo, $options: "i" },
          _id: { $ne: obj._id },
        },
        session,
        "_id"
      );
    }
    return regBase.length > 0;
  }

  async atualizarEstoqueVacina(
    tipoAtualizacao,
    itens,
    session,
    idDescarte,
    codigoDescarte,
    tpOperacao,
    userRequisicao
  ) {
    let tpMotControleEstoque;

    switch (tpOperacao) {
      case cnst.TIPO_OPERACAO.INSERT:
        tpMotControleEstoque = cnst.TIPO_MOTIVO_CONTROLE_ESTOQUE.DESCARTE;
        break;

      case cnst.TIPO_OPERACAO.UPDATE:
        tpMotControleEstoque =
          cnst.TIPO_MOTIVO_CONTROLE_ESTOQUE.ALTERACAO_DESCARTE;
        break;

      case cnst.TIPO_OPERACAO.DELETE:
        tpMotControleEstoque =
          cnst.TIPO_MOTIVO_CONTROLE_ESTOQUE.EXCLUSAO_DESCARTE;
        break;

      default:
        throw new Error(`Tipo de operação inválida: ${tpOperacao}`);
    }
    const tpEventoControleEstoque =
      tipoAtualizacao == cnst.TIPO_ATUALIZACAO_ESTOQUE.ADICIONAR
        ? cnst.TIPO_EVENTO_CONTROLE_ESTOQUE.ENTRADA
        : cnst.TIPO_EVENTO_CONTROLE_ESTOQUE.SAIDA;

    const estoqueController = new ControleEstoqueVacinaController();

    for (let index = 0; index < itens.length; index++) {
      const element = itens[index];
      let vacina = await this.service.getById(
        modelVacina,
        element.vacina._id,
        session,
        "_id nome qtd_doses_estoque"
      );
      if (!!vacina) {
        let qtd_estoque_antes = vacina.qtd_doses_estoque;

        if (tipoAtualizacao == cnst.TIPO_ATUALIZACAO_ESTOQUE.ADICIONAR) {
          vacina.qtd_doses_estoque =
            vacina.qtd_doses_estoque + element.qtd_doses_descarte;
        } else if (tipoAtualizacao == cnst.TIPO_ATUALIZACAO_ESTOQUE.REMOVER) {
          vacina.qtd_doses_estoque =
            vacina.qtd_doses_estoque - element.qtd_doses_descarte;
        } else {
          throw new Error(
            `Tipo de atualização de estoque inválida: ${tipoAtualizacao}`
          );
        }
        const regAtualizado = await this.service.update(
          modelVacina,
          element.vacina._id,
          vacina.toObject(),
          session
        );

        if (regAtualizado.modifiedCount === 0) {
          throw new Error(
            `Estoque não pode ser atualizado porque vacina com id ${element.vacina._id} não foi localizada`
          );
        } else {
          //insere registro de controle de estoque
          const regContEstoque = new ControleEstoqueVacina(
            { _id: vacina._id, nome: vacina.nome }, //vacina
            { _id: userRequisicao._id, nome: userRequisicao.nome }, //usuario
            new Date(), // data_evento
            tpEventoControleEstoque, //tipo_evento
            tpMotControleEstoque, //tipo_motivo,
            `Descarte código: ${codigoDescarte}`, //descricao_evento
            idDescarte, //id_entidade_relac_evento
            qtd_estoque_antes, //qtd_estoque_antes
            vacina.qtd_doses_estoque //qtd_estoque_depois
          );

          await estoqueController.inserirFromRecord(regContEstoque, session);
        }
      } else {
        throw new Error(
          `Não foi possível atualizar o estoque da vacina com Id ${idDescarte} pois a mesma não foi localizada.`
        );
      }
    }
  }

  async doOnAdd(regAdicionado, user, session) {
    //atualiza o estoque dos itens dos produtos
    await this.atualizarEstoqueVacina(
      cnst.TIPO_ATUALIZACAO_ESTOQUE.REMOVER,
      regAdicionado.itens_descarte,
      session,
      regAdicionado._id,
      regAdicionado.codigo,
      cnst.TIPO_OPERACAO.INSERT,
      user
    );
  }

  async doOnDelete(id, objBeforeDelete, objDeleted, user, session) {
    //atualiza o estoque dos itens dos produtos
    await this.atualizarEstoqueVacina(
      cnst.TIPO_ATUALIZACAO_ESTOQUE.ADICIONAR,
      objDeleted.itens_descarte,
      session,
      id,
      objDeleted.codigo,
      cnst.TIPO_OPERACAO.DELETE,
      user
    );
  }

  async doOnUpdate(id, objBeforeUpdate, objUpdated, user, session) {
    // verifica se houve mudanca nos itens da compra
    if (
      JSON.stringify(objBeforeUpdate.itens_descarte) !==
      JSON.stringify(objUpdated.itens_descarte)
    ) {
      // atualizar estoque, adicionando ao estoque os itens antes da mudanca
      await this.atualizarEstoqueVacina(
        cnst.TIPO_ATUALIZACAO_ESTOQUE.ADICIONAR,
        objBeforeUpdate.itens_descarte,
        session,
        id,
        objBeforeUpdate.codigo,
        cnst.TIPO_OPERACAO.UPDATE,
        user
      );

      // atualizar estoque, removendo do estoque os itens depois da mudanca
      await this.atualizarEstoqueVacina(
        cnst.TIPO_ATUALIZACAO_ESTOQUE.REMOVER,
        objUpdated.itens_descarte,
        session,
        id,
        objUpdated.codigo,
        cnst.TIPO_OPERACAO.UPDATE,
        user
      );
    }
  }
}

module.exports = DescarteVacinaController;
