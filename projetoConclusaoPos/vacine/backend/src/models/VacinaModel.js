const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vacinaSchema = Schema({
  tx_nome: {
    type: String,
    required: true,
  },
  tx_protecao_contra: {
    type: String,
    required: true,
  },
  tx_composicao: {
    type: String,
    required: true,
  },
  in_idade_recomendada: {
    type: Boolean,
    required: true,
  },
  tp_idade_recomendada: {
    // m (meses), a (anos)
    type: String,
    required: false,
  },
  nr_idade_recomendada: {
    type: Number,
    required: false,
  },
  dt_inclusao: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  dt_alteracao: {
    type: Date,
    required: false,
  },
});

module.exports = vacinaModel = mongoose.model("vacinas", vacinaSchema);