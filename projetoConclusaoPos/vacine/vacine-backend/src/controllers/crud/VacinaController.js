const GenericCrudController = require("./GenericCrudController");
const VacinaService = require("../../services/GenericCrudService");
const VacinaModel = require("../../models/VacinaModel");
const Acesso = require("../../setup/acesso");

function createVacina(obj) {
  let vacina = {};
  vacina.nome = obj.nome;
  vacina.protecao_contra = obj.protecao_contra;
  vacina.composicao = obj.composicao;
  vacina.in_idade_recomendada = obj.in_idade_recomendada;
  vacina.tp_idade_recomendada = obj.tp_idade_recomendada;
  vacina.nr_idade_recomendada = obj.nr_idade_recomendada;
  vacina.estoque = obj.estoque;  

  return vacina;
}
class VacinaController extends GenericCrudController {
  constructor() {
    const perfisRequeridosVacina = Acesso.getPerfisPorTema(Acesso.TEMA.VACINA);

    super(VacinaService, VacinaModel, perfisRequeridosVacina, createVacina);
  }
}

module.exports = VacinaController;
