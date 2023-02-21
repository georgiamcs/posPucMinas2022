const { AutorizacaoService } = require("../../services/autorizacao.service");
const GenericCrudController = require("./generic-crud.controller");
const GenericCrudService = require("../../services/generic-crud.service");
const VacinaModel = require("../../models/vacina.model");
const ControleEstoqueVacinaController = require("../../controllers/crud/controle-estoque-vacina.controller");
const Acesso = require("../../setup/acesso");
const ControleEstoqueVacina = require("../../classes/controle-estoque-vacina.class");
const mongoose = require("mongoose");
const cnst = require("../../constantes");

function createVacina(obj) {
  let vacina = {};
  vacina.nome = obj.nome;
  vacina.protecao_contra = obj.protecao_contra;
  vacina.composicao = obj.composicao;
  vacina.in_idade_recomendada = obj.in_idade_recomendada;
  vacina.tp_idade_recomendada = obj.tp_idade_recomendada;
  vacina.nr_idade_recomendada = obj.nr_idade_recomendada;

  // se id for nulo ou undefined, i.e, obj sendo criado, define o estoque
  // caso contrario, so pela funcionalidade de atualizar estoque
  if (!!!obj._id) {
    vacina.qtd_doses_estoque = obj.qtd_doses_estoque;
  }

  return vacina;
}

function createObjAtualizaEstoque(obj) {
  let vacina = {};
  vacina.qtd_doses_estoque = obj.qtd_doses_estoque;
  return vacina;
}

async function existeDuplicado(obj) {
  searchTerm = obj.nome.trim();
  // TENTATIVAS DE FAZER CASE INSENSITIVE
  // regBase = await VacinaService.find(VacinaModel, {
  //   nome: { $regex: `/${searchTerm}/i` }
  // });
  // regBase = await VacinaService.find(VacinaModel, {
  //   nome: { $regex: new RegExp(searchTerm, "i") },
  // });
  if (!!obj._id) {
    regBase = await GenericCrudService.find(VacinaModel, {
      nome: searchTerm,
      _id: { $ne: obj._id },
    });
  } else {
    regBase = await GenericCrudService.find(VacinaModel, {
      nome: searchTerm,
    });
  }
  return regBase.length > 0;
}

async function podeExcluir(id, session) {
  const comprasDaVacina = await GenericCrudService.getAll(CompraVacinaModel,
    session,
    {
      "itens_compra.vacina._id": id,
    },
    "_id"
  );  

  return comprasDaVacina.length == 0;
}
class VacinaController extends GenericCrudController {
  constructor() {
    const perfisRequeridosVacina = Acesso.getPerfisPorTema(Acesso.TEMA.VACINA);

    super(
      GenericCrudService,
      VacinaModel,
      perfisRequeridosVacina,
      createVacina,
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
          const regAdicionado = await this.service.add(
            this.objectModel,
            this.fnCriarObjEntidade,
            req.body,
            session
          );

          let estoqueController = new ControleEstoqueVacinaController();

          const regContEstoque = new ControleEstoqueVacina(
            { _id: regAdicionado._id, nome: regAdicionado.nome }, //vacina
            { _id: req.user._id, nome: req.user.nome }, //usuario
            new Date(), // data_evento
            cnst.TIPO_EVENTO_CONTROLE_ESTOQUE.ENTRADA, //tipo_evento
            cnst.TIPO_MOTIVO_CONTROLE_ESTOQUE.CADASTRO_INICIAL, //tipo_motivo,
            null, //descricao_evento
            null, //justificativa_evento
            0, //qtd_estoque_antes
            regAdicionado.qtd_doses_estoque //qtd_estoque_depois
          );

          await estoqueController.inserirFromRecord(regContEstoque, session);

          await session.commitTransaction();
          res.status(cnst.RETORNO_HTTP.HTTP_CREATED).json(regAdicionado);
        }
      } catch (error) {
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
        const podeExcluir = await this.fnPodeExcluir(id);

        if (!podeExcluir) {
          res
            .status(cnst.RETORNO_HTTP.HTTP_CONFLIT)
            .json({ error: cnst.MENSAGEM.NAO_PODE_EXCLUIR });
        } else {
          const deleteResponse = await this.service.deleteById(
            this.objectModel,
            id,
            session
          );

          let estoqueController = new ControleEstoqueVacinaController();
          await estoqueController.excluirCascataVacina(id, session);

          await session.commitTransaction();
          res.status(cnst.RETORNO_HTTP.HTTP_OK).json(deleteResponse);
        }
      } catch (error) {
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

  atualizarEstoque = async (req, res) => {
    if (AutorizacaoService.checarPerfis(req, this.perfisRequeridos)) {
      let id = req.params.id;

      const session = await mongoose.startSession();
      session.startTransaction();

      try {
        const qtd_estoque_antes = await await this.service.getById(
          VacinaModel,
          id,
          session,
          "qtd_doses_estoque"
        );
        let regAlterado = createObjAtualizaEstoque(req.body);
        const regAtualizado = await this.service.update(
          this.objectModel,
          id,
          regAlterado,
          session
        );

        if (regAtualizado.modifiedCount === 0) {
          return res.status(cnst.RETORNO_HTTP.HTTP_NOT_FOUND).json({
            error: `Estoque de vacina com id ${id} não foi atualizado.`,
          });
        } else {
          const tipoEvento =
            qtd_estoque_antes <= regAdicionado.qtd_doses_estoque
              ? cnst.TIPO_EVENTO_CONTROLE_ESTOQUE.ENTRADA
              : cnst.TIPO_EVENTO_CONTROLE_ESTOQUE.SAIDA;

          // insere registro de controle de estoque
          let estoqueController = new ControleEstoqueVacinaController();

          const regContEstoque = new ControleEstoqueVacina(
            { _id: regAdicionado._id, nome: regAdicionado.nome }, //vacina
            { _id: req.user._id, nome: req.user.nome }, //usuario
            new Date(), // data_evento
            tipoEvento, //tipo_evento
            cnst.TIPO_MOTIVO_CONTROLE_ESTOQUE.AJUSTE_ESTOQUE, //tipo_motivo,
            null, //descricao_evento
            null, //justificativa_evento
            qtd_estoque_antes, //qtd_estoque_antes
            regAdicionado.qtd_doses_estoque //qtd_estoque_depois
          );

          await estoqueController.inserirFromRecord(regContEstoque, session);

          await session.commitTransaction();
          res.status(cnst.RETORNO_HTTP.HTTP_OK).json(regAtualizado);
        }
      } catch (error) {
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
}

module.exports = VacinaController;
