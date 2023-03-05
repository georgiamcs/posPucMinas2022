const GenericCrudController = require("./generic-crud.controller");
const ControleEstoqueVacinaController = require("../../controllers/crud/controle-estoque-vacina.controller");
const genericService = require("../../services/generic-crud.service");
const CompraVacinaModel = require("../../models/compra-vacina.model");
const Acesso = require("../../setup/acesso");
const AutorizacaoService = require("../../services/autorizacao.service");
const ControleEstoqueVacina = require("../../classes/controle-estoque-vacina.class");
const modelVacina = require("../../models/vacina.model");
const cnst = require("../../constantes");

class CompraVacinaController extends GenericCrudController {
  constructor() {
    super(genericService, CompraVacinaModel, Acesso.TEMA_ACESSO.COMPRA_VACINA);
  }

  createObj(obj, user) {
    let registro = {};

    registro.fornecedor = obj.fornecedor;
    registro.nota_fiscal = obj.nota_fiscal;
    registro.data_compra = obj.data_compra;
    registro.itens_compra = obj.itens_compra;
    registro.vl_total_compra = obj.vl_total_compra;

    return registro;
  }

  async temDuplicado(obj, session, tipoOperacao) {
    let searchNotaFiscal = obj.nota_fiscal.trim();
    let regBase = [];

    if (tipoOperacao === cnst.TIPO_OPERACAO.INSERT) {
      regBase = await genericService.find(
        CompraVacinaModel,
        {
          nota_fiscal: { $regex: searchNotaFiscal, $options: "i" }
        },
        session,
        "_id"
      );
    } else if (tipoOperacao === cnst.TIPO_OPERACAO.UPDATE) {
      regBase = await genericService.find(
        CompraVacinaModel,
        {
          nota_fiscal: { $regex: searchNotaFiscal, $options: "i" },
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
    itensCompra,
    session,
    idCompra,
    nfCompra,
    tpOperacao,
    userRequisicao
  ) {
    let tpMotControleEstoque;

    switch (tpOperacao) {
      case cnst.TIPO_OPERACAO.INSERT:
        tpMotControleEstoque = cnst.TIPO_MOTIVO_CONTROLE_ESTOQUE.COMPRA;
        break;

      case cnst.TIPO_OPERACAO.UPDATE:
        tpMotControleEstoque =
          cnst.TIPO_MOTIVO_CONTROLE_ESTOQUE.ALTERACAO_COMPRA;
        break;

      case cnst.TIPO_OPERACAO.DELETE:
        tpMotControleEstoque =
          cnst.TIPO_MOTIVO_CONTROLE_ESTOQUE.EXCLUSAO_COMPRA;
        break;

      default:
        throw new Error(`Tipo de operação inválida: ${tpOperacao}`);
    }
    const tpEventoControleEstoque =
      tipoAtualizacao == cnst.TIPO_ATUALIZACAO_ESTOQUE.ADICIONAR
        ? cnst.TIPO_EVENTO_CONTROLE_ESTOQUE.ENTRADA
        : cnst.TIPO_EVENTO_CONTROLE_ESTOQUE.SAIDA;

    const estoqueController = new ControleEstoqueVacinaController();

    for (let index = 0; index < itensCompra.length; index++) {
      const element = itensCompra[index];
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
            vacina.qtd_doses_estoque + element.qtd_doses;
        } else if (tipoAtualizacao == cnst.TIPO_ATUALIZACAO_ESTOQUE.REMOVER) {
          vacina.qtd_doses_estoque =
            vacina.qtd_doses_estoque - element.qtd_doses;
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
            `Compra nota fiscal: ${nfCompra}`, //descricao_evento
            idCompra, //justificativa_evento
            qtd_estoque_antes, //qtd_estoque_antes
            vacina.qtd_doses_estoque //qtd_estoque_depois
          );

          await estoqueController.inserirFromRecord(regContEstoque, session);
        }
      } else {
        throw new Error(
          `Não foi possível atualizar o estoque da vacina com Id ${id} pois a mesma não foi localizada.`
        );
      }
    }
  }

  async doOnAdd(regAdicionado, user, session) {
    //atualiza o estoque dos itens dos produtos
    await this.atualizarEstoqueVacina(
      cnst.TIPO_ATUALIZACAO_ESTOQUE.ADICIONAR,
      regAdicionado.itens_compra,
      session,
      regAdicionado._id,
      regAdicionado.nota_fiscal,
      cnst.TIPO_OPERACAO.INSERT,
      user
    );
  }

  async doOnDelete(id, objBeforeDelete, objDeleted, user, session) {
    //atualiza o estoque dos itens dos produtos
    await this.atualizarEstoqueVacina(
      cnst.TIPO_ATUALIZACAO_ESTOQUE.REMOVER,
      objDeleted.itens_compra,
      session,
      id,
      objDeleted.nota_fiscal,
      cnst.TIPO_OPERACAO.DELETE,
      user
    );
  }

  async doOnUpdate(id, objBeforeUpdate, objUpdated, user, session) {
    // verifica se houve mudanca nos itens da compra
    if (
      JSON.stringify(objBeforeUpdate.itens_compra) !==
      JSON.stringify(objUpdated.itens_compra)
    ) {
      // atualizar estoque, removendo o estoque dos itens da compra antes da mudanca
      await this.atualizarEstoqueVacina(
        cnst.TIPO_ATUALIZACAO_ESTOQUE.REMOVER,
        objBeforeUpdate.itens_compra,
        session,
        id,
        objBeforeUpdate.nota_fiscal,
        cnst.TIPO_OPERACAO.UPDATE,
        user
      );

      // atualizar estoque, adicionando o estoque dos itens da compra apos a mudanca
      await this.atualizarEstoqueVacina(
        cnst.TIPO_ATUALIZACAO_ESTOQUE.ADICIONAR,
        objUpdated.itens_compra,
        session,
        id,
        objUpdated.nota_fiscal,
        cnst.TIPO_OPERACAO.UPDATE,
        user
      );
    }
  }
}

module.exports = CompraVacinaController;
