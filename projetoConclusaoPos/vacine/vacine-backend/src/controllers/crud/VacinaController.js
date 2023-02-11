const GenericCrudController = require("./GenericCrudController");
const VacinaService = require("../../services/GenericCrudService");
const VacinaModel = require("../../models/VacinaModel");
const cnst = require("../../constantes");

function createVacina(obj) {
  let vacina = {};
  vacina.tx_nome = obj.tx_nome;
  vacina.tx_protecao_contra = obj.tx_protecao_contra;
  vacina.tx_composicao = obj.tx_composicao;
  vacina.in_idade_recomendada = obj.in_idade_recomendada;
  vacina.tp_idade_recomendada = obj.tp_idade_recomendada;
  vacina.nr_idade_recomendada = obj.nr_idade_recomendada;

  return vacina;
}

const perfisRequeridosVacina = [
  cnst.PERFIS.ADMINISTRADOR,
  cnst.PERFIS.CADASTRADOR_COMPRA,
  cnst.PERFIS.CADASTRADOR_VACINA,
];

class VacinaController extends GenericCrudController {
  constructor() {
    super(VacinaService, VacinaModel, perfisRequeridosVacina, createVacina);
  }
}

module.exports = VacinaController;
