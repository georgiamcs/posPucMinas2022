const AutorizacaoService = require("../../services/autorizacao.service");
const GenericCrudController = require("./generic-crud.controller");
const ControleEstoqueVacinaController = require("./controle-estoque-vacina.controller");
const genericService = require("../../services/generic-crud.service");
const VacinacaoModel = require("../../models/vacinacao.model");
const Acesso = require("../../setup/acesso");
const ControleEstoqueVacina = require("../../classes/controle-estoque-vacina.class");
const modelVacina = require("../../models/vacina.model");
const cnst = require("../../constantes");

class VacinacaoController extends GenericCrudController {
  constructor() {
    super(genericService, VacinacaoModel, Acesso.TEMA_ACESSO.VACINACAO);
  }

  createObj(obj, user) {
    let registro = {};
    registro.codigo = obj.codigo;
    registro.usuario_resp_cadastro = user;
    registro.usuario_cliente = obj.usuario_cliente;
    registro.usuario_aplicador_vacina = obj.usuario_aplicador_vacina;
    registro.data_aplicacao = obj.data_aplicacao;
    registro.vl_total = obj.vl_total;
    registro.itens_vacinacao = obj.itens_vacinacao;

    return registro;
  }

  async temDuplicado(obj, session, tipoOperacao) {
    let searchCodigo = obj.codigo;
    let regBase = [];

    if (tipoOperacao === cnst.TIPO_OPERACAO.INSERT) {
      regBase = await genericService.find(
        VacinacaoModel,
        {
          codigo: searchCodigo,
          _id: { $ne: obj._id },
        },
        session,
        "_id"
      );
    } else if (tipoOperacao === cnst.TIPO_OPERACAO.UPDATE) {
      regBase = await genericService.find(
        VacinacaoModel,
        {
          codigo: searchCodigo,
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
    idVacinacao,
    codigoVacinacao,
    tpOperacao,
    userRequisicao
  ) {
    let tpMotControleEstoque;

    switch (tpOperacao) {
      case cnst.TIPO_OPERACAO.INSERT:
        tpMotControleEstoque = cnst.TIPO_MOTIVO_CONTROLE_ESTOQUE.VACINACAO;
        break;

      case cnst.TIPO_OPERACAO.UPDATE:
        tpMotControleEstoque =
          cnst.TIPO_MOTIVO_CONTROLE_ESTOQUE.ALTERACAO_VACINACAO;
        break;

      case cnst.TIPO_OPERACAO.DELETE:
        tpMotControleEstoque =
          cnst.TIPO_MOTIVO_CONTROLE_ESTOQUE.EXCLUSAO_VACINACAO;
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
            `Vacinação código: ${codigoVacinacao}`, //descricao_evento
            idVacinacao, //id_entidade_relac_evento
            qtd_estoque_antes, //qtd_estoque_antes
            vacina.qtd_doses_estoque //qtd_estoque_depois
          );

          await estoqueController.inserirFromRecord(regContEstoque, session);
        }
      } else {
        throw new Error(
          `Não foi possível atualizar o estoque da vacina com Id ${idVacinacao} pois a mesma não foi localizada.`
        );
      }
    }
  }

  async doOnAdd(regAdicionado, user, session) {
    //atualiza o estoque dos itens dos produtos
    await this.atualizarEstoqueVacina(
      cnst.TIPO_ATUALIZACAO_ESTOQUE.REMOVER,
      regAdicionado.itens_vacinacao,
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
      objDeleted.itens_vacinacao,
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
      JSON.stringify(objBeforeUpdate.itens_vacinacao) !==
      JSON.stringify(objUpdated.itens_vacinacao)
    ) {
      // atualizar estoque, adicionando ao estoque os itens da vacinacao antes da mudanca
      await this.atualizarEstoqueVacina(
        cnst.TIPO_ATUALIZACAO_ESTOQUE.ADICIONAR,
        objBeforeUpdate.itens_vacinacao,
        session,
        id,
        objBeforeUpdate.codigo,
        cnst.TIPO_OPERACAO.UPDATE,
        user
      );

      // atualizar estoque, removendo do estoque os itens da vacinacao depois da mudanca
      await this.atualizarEstoqueVacina(
        cnst.TIPO_ATUALIZACAO_ESTOQUE.REMOVER,
        objUpdated.itens_vacinacao,
        session,
        id,
        objUpdated.codigo,
        cnst.TIPO_OPERACAO.UPDATE,
        user
      );
    }
  }

  getVacinacoesUsuario = async (req, res) => {
    const id = req.params.id;
    if (
      AutorizacaoService.checarTemPerfil(req, this.temaAcesso, [
        Acesso.TIPO_ACESSO_USUARIO.VISUALIZAR_TODOS,
        Acesso.TIPO_ACESSO_USUARIO.VISUALIZAR_PROPRIO
      ])
    ) {
      const registros = await this.service.getAll(this.objectModel, undefined, {
        "usuario_cliente._id": id,
      });

      try {
        if (!registros) {
          return res
            .status(cnst.RETORNO_HTTP.HTTP_NOT_FOUND)
            .json("Não existem registros cadastrados!");
        }

        res.json(registros);
      } catch (err) {
        return res
          .status(cnst.RETORNO_HTTP.HTTP_INTERNAL_SERVER_ERRO)
          .json({ error: err.message });
      }
    } else {
      res
        .status(cnst.RETORNO_HTTP.HTTP_FORBIDEN)
        .json({ error: "Acesso negado" });
    }
  };
}

module.exports = VacinacaoController;
