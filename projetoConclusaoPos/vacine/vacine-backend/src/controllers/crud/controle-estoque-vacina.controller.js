const AutorizacaoService = require("../../services/autorizacao.service");
const GenericCrudController = require("./generic-crud.controller");
const Service = require("../../services/generic-crud.service");
const Model = require("../../models/controle-estoque-vacina.model");
const Acesso = require("../../setup/acesso");
const cnst = require("../../constantes");

class ControleEstoqueVacinaController extends GenericCrudController {
  constructor() {
    super(Service, Model, Acesso.TEMA_ACESSO.VACINA);
  }

  createObj(obj, user) {
    let cestoque = {};

    cestoque.vacina = obj.vacina;
    cestoque.usuario = obj.usuario;
    cestoque.data_evento = obj.data_evento;
    cestoque.tipo_evento = obj.tipo_evento;
    cestoque.tipo_motivo = obj.tipo_motivo;
    cestoque.descricao_evento = obj.descricao_evento;
    cestoque.justificativa_evento = obj.justificativa_evento;
    cestoque.qtd_estoque_antes = obj.qtd_estoque_antes;
    cestoque.qtd_estoque_depois = obj.qtd_estoque_depois;

    return cestoque;
  }

  getByIdVacina = async (req, res) => {
    if (
      AutorizacaoService.checarTemPerfil(req, this.temaAcesso, [
        Acesso.TIPO_ACESSO_USUARIO.VISUALIZAR_TODOS,
        Acesso.TIPO_ACESSO_USUARIO.SELECIONAR,
      ])
    ) {
      const id = req.params.id;

    if (id.length !== 24) {
      //tamanho do campo id no mongodb
      return res
        .status(cnst.RETORNO_HTTP.HTTP_NOT_FOUND)
        .json({ error: `Registro com Id ${id} não encontrado.` });
    }         

      const registros = await this.service.getAll(this.objectModel, undefined, {
        "vacina._id": id,
      });

      try {
        if (!registros || registros.length == 0) {
          return res
            .status(cnst.RETORNO_HTTP.HTTP_NOT_FOUND)
            .json(`Não existem registros cadastrados para vacina ${id}`);
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
        .json({ error: "Sem permissão para acessar o serviço." });
    }
  };

  async inserirFromRecord(novoRegContEstoqueVacina, session) {
    await this.service.add(this.objectModel, novoRegContEstoqueVacina, session);
  }

  async excluirCascataVacina(idVacina, session) {
    await this.service.deleteByQuery(
      this.objectModel,
      { "vacina._id": idVacina },
      session
    );
  }
}

module.exports = ControleEstoqueVacinaController;
