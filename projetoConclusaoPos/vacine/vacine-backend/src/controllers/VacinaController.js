const VacinaService = require("../services/VacinaService");

function createVacina(req) {
  let vacina = {};
  vacina.tx_nome = req.body.tx_nome;
  vacina.tx_protecao_contra = req.body.tx_protecao_contra;
  vacina.tx_composicao = req.body.tx_composicao;
  vacina.in_idade_recomendada = req.body.in_idade_recomendada;
  vacina.tp_idade_recomendada = req.body.tp_idade_recomendada;
  vacina.nr_idade_recomendada = req.body.nr_idade_recomendada;

  return vacina;
}

exports.get = async (req, res) => {
  const id = req.params.id;

  try {
    const vacina = await VacinaService.getVacinabyId(id);
    res.json(vacina);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.getAll = async (req, res) => {
  const vacinas = await VacinaService.getAllVacinas();

  try {
    if (!vacinas) {
      return res.status(404).json("Não existem vacinas cadastradas!");
    }

    res.json(vacinas);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }  
};

exports.add = async (req, res) => {
  try {
    const vacinaAdicionada = await VacinaService.addVacina(req.body);
    res.status(201).json(vacinaAdicionada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  let id = req.params.id;

  try {
    
    vacinaAlterada = createVacina(req);
    const vacinaAtualizada = await VacinaService.updateVacina(
      id,
      vacinaAlterada
    );

    if (vacinaAtualizada.nModified === 0) {
      return res.status(404).json({});
    }

    res.json(vacinaAtualizada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  let id = req.params.id;

  try {
    const deleteResponse = await VacinaService.deleteVacina(id);
    res.json(deleteResponse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
