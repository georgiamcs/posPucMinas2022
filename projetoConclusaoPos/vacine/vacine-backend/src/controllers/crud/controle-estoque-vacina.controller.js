const GenericCrudController = require("./generic-crud.controller");
const Service = require("../../services/generic-crud.service");
const Model = require("../../models/controle-estoque-vacina.model");

class ControleEstoqueVacinaController extends GenericCrudController {
  constructor() {
    const perfisRequeridos = [];

    super(Service, Model, perfisRequeridos);
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

  async inserirFromRecord(novoRegContEstoqueVacina, session) {
    await this.service.add(
      this.objectModel,
      novoRegContEstoqueVacina,
      session
    );
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
