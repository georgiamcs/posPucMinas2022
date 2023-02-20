const GenericCrudController = require("./generic-crud.controller");
const CompraVacinaService = require("../../services/generic-crud.service");
const CompraVacinaModel = require("../../models/compra-vacina.model");
const Acesso = require("../../setup/acesso");
const { AutorizacaoService } = require("../../services/autorizacao.service");
const serviceVacina = require("../../services/generic-crud.service");
const modelVacina = require("../../models/vacina.model");
const mongoose = require("mongoose");
const cnst = require("../../constantes");

function createNovoRegistro(obj) {
  let registro = {};

  registro.fornecedor = obj.fornecedor;
  registro.nota_fiscal = obj.nota_fiscal;
  registro.data_compra = obj.data_compra;
  registro.itens_compra = obj.itens_compra;
  registro.vl_total_compra = obj.vl_total_compra;

  return registro;
}
class CompraVacinaController extends GenericCrudController {
  constructor() {
    const perfisRequeridosCompraVacina = Acesso.getPerfisPorTema(
      Acesso.TEMA.COMPRA_VACINA
    );

    super(
      CompraVacinaService,
      CompraVacinaModel,
      perfisRequeridosCompraVacina,
      createNovoRegistro
    );
  }

  add = async (req, res) => {
    if (AutorizacaoService.checarPerfis(req, this.perfisRequeridos)) {
      const session = await mongoose.startSession();
      session.startTransaction();

      try {
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
          session
        );
        await session.commitTransaction();
        res.status(cnst.RETORNO_HTTP.HTTP_CREATED).json(regAdicionado);
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
        const regDeletado = await this.service.delete(
          this.objectModel,
          id,
          session
        );
        //atualiza o estoque dos itens dos produtos
        await this.atualizarEstoqueVacina(
          cnst.TIPO_ATUALIZACAO_ESTOQUE.REMOVER,
          regDeletado.itens_compra,
          session
        );
        await session.commitTransaction();

        res.status(cnst.RETORNO_HTTP.HTTP_OK).json(regDeletado);
      } catch (error) {
        console.error(`Erro ao excluir compra da vacina de id ${id} => ${error}`);
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

        // atualizar estoque, removendo o estoque dos itens da compra antes da mudanca
        await this.atualizarEstoqueVacina(
          cnst.TIPO_ATUALIZACAO_ESTOQUE.REMOVER,
          compraAntes.itens_compra,
          session
        );
        // atualizar estoque, adicionando o estoque dos itens da compra apos a mudanca
        await this.atualizarEstoqueVacina(
          cnst.TIPO_ATUALIZACAO_ESTOQUE.ADICIONAR,
          regAlterado.itens_compra,
          session
        );

        await session.commitTransaction();
        res.status(cnst.RETORNO_HTTP.HTTP_OK).json(regAtualizado);
      } catch (error) {
        console.log(`Erro ao atualizar compra de vacina com id ${id} => ${error}`);
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

  async atualizarEstoqueVacina(tipoAtualizacao, itensCompra, session) {
    for (let index = 0; index < itensCompra.length; index++) {
      const element = itensCompra[index];
      let vacina = await serviceVacina.getOne(
        modelVacina,
        { _id: element.vacina._id },
        session
      );
      if (!!vacina) {
        if (tipoAtualizacao == cnst.TIPO_ATUALIZACAO_ESTOQUE.ADICIONAR) {
          vacina.estoque = vacina.estoque + element.qtd_doses;
        } else if (tipoAtualizacao == cnst.TIPO_ATUALIZACAO_ESTOQUE.REMOVER) {
          vacina.estoque = vacina.estoque - element.qtd_doses;
        } else {
          throw new Error(
            `Tipo de atualização de estoque inválida: ${tipoAtualizacao}`
          );
        }
        const regAtualizado = await serviceVacina.update(
          modelVacina,
          element.vacina._id,
          vacina.toObject(),
          session
        );

        if (regAtualizado.modifiedCount === 0) {
          throw new Error(
            `Estoque não pode ser atualizado porque vacina com id ${element.vacina._id} não foi localizada`
          );
        }
      } else {
        throw new Error(`Não foi possível atualizat o estoque da vacina com Id ${id} pois a mesma não foi localizada.`);
      }
    }
  }
}

module.exports = CompraVacinaController;
