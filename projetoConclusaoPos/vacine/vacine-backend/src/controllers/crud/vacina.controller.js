const GenericCrudController = require("./generic-crud.controller");
const VacinaService = require("../../services/generic-crud.service");
const VacinaModel = require("../../models/vacina.model");
const Acesso = require("../../setup/acesso");

function createVacina(obj) {
  let vacina = {};
  vacina.nome = obj.nome;
  vacina.protecao_contra = obj.protecao_contra;
  vacina.composicao = obj.composicao;
  vacina.in_idade_recomendada = obj.in_idade_recomendada;
  vacina.tp_idade_recomendada = obj.tp_idade_recomendada;
  vacina.nr_idade_recomendada = obj.nr_idade_recomendada;
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
    regBase = await VacinaService.find(VacinaModel, {
      nome: searchTerm,
      _id: { $ne: obj._id },
    });
  } else {
    regBase = await VacinaService.find(VacinaModel, {
      nome: searchTerm
    });
  }
  return regBase.length > 0;
}
class VacinaController extends GenericCrudController {
  constructor() {
    const perfisRequeridosVacina = Acesso.getPerfisPorTema(Acesso.TEMA.VACINA);

    super(
      VacinaService,
      VacinaModel,
      perfisRequeridosVacina,
      createVacina,
      existeDuplicado
    );
  }
}

module.exports = VacinaController;
