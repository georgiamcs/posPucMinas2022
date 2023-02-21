const GenericCrudController = require("./generic-crud.controller");
const ControleEstoqueVacinaController = require("../../controllers/crud/controle-estoque-vacina.controller");
const genericService = require("../../services/generic-crud.service");
const CompraVacinaModel = require("../../models/compra-vacina.model");
const Acesso = require("../../setup/acesso");
const { AutorizacaoService } = require("../../services/autorizacao.service");
const ControleEstoqueVacina = require("../../classes/controle-estoque-vacina.class");
const modelVacina = require("../../models/vacina.model");
const mongoose = require("mongoose");
const cnst = require("../../constantes");

function criarRegistro(obj) {
  let registro = {};

  registro.fornecedor = obj.fornecedor;
  registro.nota_fiscal = obj.nota_fiscal;
  registro.data_compra = obj.data_compra;
  registro.itens_compra = obj.itens_compra;
  registro.vl_total_compra = obj.vl_total_compra;

  return registro;
}

async function existeDuplicado(obj, session) {
  searchNotaFiscal = obj.nota_fiscal.trim();

  if (!!obj._id) {
    regBase = await genericService.find(CompraVacinaModel, {
      nota_fiscal: searchNotaFiscal,
      _id: { $ne: obj._id },
    }, session, "_id");
  } else {
    regBase = await genericService.find(
      CompraVacinaModel,
      {
        nota_fiscal: searchNotaFiscal,
      },
      session,
      "_id"
    );
  }
  return regBase.length > 0;
}

async function podeExcluir(id, session) {
  return true;
}

class CompraVacinaController extends GenericCrudController {
  constructor() {
    const perfisRequeridosCompraVacina = Acesso.getPerfisPorTema(
      Acesso.TEMA.COMPRA_VACINA
    );

    super(
      genericService,
      CompraVacinaModel,
      perfisRequeridosCompraVacina,
      criarRegistro,
      existeDuplicado,
      podeExcluir
    );
  }

  add = async (req, res) => {
    if (AutorizacaoService.checarPerfis(req, this.perfisRequeridos)) {
      const session = await mongoose.startSession();
      session.startTransaction();

      try {
        const regDuplicado = await this.fnVerificarRegDuplicado(req.body);

        if (!!regDuplicado) {
          res
            .status(cnst.RETORNO_HTTP.HTTP_CONFLIT)
            .json({ error: cnst.MENSAGEM.REGISTRO_DUPLICADO });
        } else {
          // adiciona a compra
          const regAdicionado = await this.service.add(
            this.objectModel,
            this.fnCriarObjEntidade,
            req.body,
            session
          );
          //atualiza o estoque dos itens dos produtos
          await this.atualizarEstoqueVacina(
            cnst.TIPO_ATUALIZACAO_ESTOQUE.ADICIONAR,
            regAdicionado.itens_compra,
            session,
            regAdicionado._id,
            regAdicionado.nota_fiscal,
            cnst.TIPO_OPERACAO.INSERT,
            req.user
          );

          await session.commitTransaction();
          res.status(cnst.RETORNO_HTTP.HTTP_CREATED).json(regAdicionado);
        }
      } catch (error) {
        console.error(
          `Erro ao adicionar compra da vacina ${req.body} => ${error}`
        );
        await session.abortTransaction();
        res
          .status(cnst.RETORNO_HTTP.HTTP_INTERNAL_SERVER_ERRO)
          .json({ error: error.message });
      } finally {
        session.endSession();
      }
    } else {
      res
        .status(cnst.RETORNO_HTTP.HTTP_FORBIDEN)
        .json({ error: "Acesso negado" });
    }
  };

  delete = async (req, res) => {
    if (AutorizacaoService.checarPerfis(req, this.perfisRequeridos)) {
      let id = req.params.id;

      const session = await mongoose.startSession();
      session.startTransaction();

      try {
        //exclui a compra
        const regDeletado = await this.service.deleteById(
          this.objectModel,
          id,
          session
        );
        //atualiza o estoque dos itens dos produtos
        await this.atualizarEstoqueVacina(
          cnst.TIPO_ATUALIZACAO_ESTOQUE.REMOVER,
          regDeletado.itens_compra,
          session,
          regDeletado._id,
          regDeletado.nota_fiscal,
          cnst.TIPO_OPERACAO.DELETE,
          req.user
        );
        await session.commitTransaction();

        res.status(cnst.RETORNO_HTTP.HTTP_OK).json(regDeletado);
      } catch (error) {
        console.error(
          `Erro ao excluir compra da vacina de id ${id} => ${error}`
        );
        await session.abortTransaction();
        res
          .status(cnst.RETORNO_HTTP.HTTP_INTERNAL_SERVER_ERRO)
          .json({ error: error.message });
      } finally {
        session.endSession();
      }
    } else {
      res
        .status(cnst.RETORNO_HTTP.HTTP_FORBIDEN)
        .json({ error: "Acesso negado" });
    }
  };

  update = async (req, res) => {
    if (AutorizacaoService.checarPerfis(req, this.perfisRequeridos)) {
      let id = req.params.id;

      const session = await mongoose.startSession();
      session.startTransaction();

      try {
        const regDuplicado = await this.fnVerificarRegDuplicado(req.body);

        if (!!regDuplicado) {
          res
            .status(cnst.RETORNO_HTTP.HTTP_CONFLIT)
            .json({ error: cnst.MENSAGEM.REGISTRO_DUPLICADO });
        } else {
          let compraAntes = await this.service.getById(this.objectModel, id);
          if (!compraAntes) {
            throw new Error(`Compra com Id ${id} não localizada`);
          }
          let regAlterado = this.fnCriarObjEntidade(req.body);
          const regAtualizado = await this.service.update(
            this.objectModel,
            id,
            regAlterado,
            session
          );

          if (regAtualizado.modifiedCount === 0) {
            throw new Error(`Compra com Id ${id} não foi atualizada`);
          }

          // verifica se houve mudanca nos itens da compra
          if (
            JSON.stringify(compraAntes.itens_compra) !==
            JSON.stringify(regAlterado.itens_compra)
          ) {
            // atualizar estoque, removendo o estoque dos itens da compra antes da mudanca
            await this.atualizarEstoqueVacina(
              cnst.TIPO_ATUALIZACAO_ESTOQUE.REMOVER,
              compraAntes.itens_compra,
              session,
              id,
              regAlterado.nota_fiscal,
              cnst.TIPO_OPERACAO.UPDATE,
              req.user
            );

            // atualizar estoque, adicionando o estoque dos itens da compra apos a mudanca
            await this.atualizarEstoqueVacina(
              cnst.TIPO_ATUALIZACAO_ESTOQUE.ADICIONAR,
              regAlterado.itens_compra,
              session,
              id,
              regAlterado.nota_fiscal,
              cnst.TIPO_OPERACAO.UPDATE,
              req.user
            );
          }
          await session.commitTransaction();
          res.status(cnst.RETORNO_HTTP.HTTP_OK).json(regAtualizado);
        }
      } catch (error) {
        console.log(
          `Erro ao atualizar compra de vacina com id ${id} => ${error}`
        );
        await session.abortTransaction();
        res
          .status(cnst.RETORNO_HTTP.HTTP_INTERNAL_SERVER_ERRO)
          .json({ error: error.message });
      } finally {
        session.endSession();
      }
    } else {
      res
        .status(cnst.RETORNO_HTTP.HTTP_FORBIDEN)
        .json({ error: "Acesso negado" });
    }
  };

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
            `Compra Nota Fiscal: ${nfCompra} e ID: ${idCompra}`, //descricao_evento
            null, //justificativa_evento
            qtd_estoque_antes, //qtd_estoque_antes
            vacina.qtd_doses_estoque //qtd_estoque_depois
          );

          await estoqueController.inserirFromRecord(regContEstoque, session);
        }
      } else {
        throw new Error(
          `Não foi possível atualizat o estoque da vacina com Id ${id} pois a mesma não foi localizada.`
        );
      }
    }
  }
}

module.exports = CompraVacinaController;
