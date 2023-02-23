const { AutorizacaoService } = require("../../services/autorizacao.service");
const GenericCrudController = require("./generic-crud.controller");
const GenericCrudService = require("../../services/generic-crud.service");
const VacinaModel = require("../../models/vacina.model");
const ControleEstoqueVacinaController = require("../../controllers/crud/controle-estoque-vacina.controller");
const Acesso = require("../../setup/acesso");
const ControleEstoqueVacina = require("../../classes/controle-estoque-vacina.class");
const mongoose = require("mongoose");
const cnst = require("../../constantes");

class VacinaController extends GenericCrudController {
  constructor() {
    const perfisRequeridosVacina = Acesso.getPerfisPorTema(Acesso.TEMA.VACINA);

    super(GenericCrudService, VacinaModel, perfisRequeridosVacina);
  }

  createObj(obj, user) {
    let vacina = {};
    vacina.nome = obj.nome;
    vacina.protecao_contra = obj.protecao_contra;
    vacina.composicao = obj.composicao;
    vacina.vl_atual_unit_dose = obj.vl_atual_unit_dose;

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

  async temDuplicado(obj) {
    let searchTerm = obj.nome.trim();
    let regBase = [];
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
      null,
      0,
      regAdicionado.qtd_doses_estoque //qtd_estoque_depois
    );
    await estoqueController.inserirFromRecord(regContEstoque, session);
  }

  async doOnDelete(id, objBeforeDelete, objDeleted, user, session) {
    let estoqueController = new ControleEstoqueVacinaController();
    await estoqueController.excluirCascataVacina(id, session);
  }

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
