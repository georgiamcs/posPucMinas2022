const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vacinaSchema = Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    protecao_contra: {
      type: String,
      required: true,
    },
    composicao: {
      type: String,
      required: true,
    },
    qtd_doses_estoque: {
      type: Number,
      required: true,
    },
    vl_atual_unit_dose: {
      type: Number,
      required: true,
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
  },
  {
    strictQuery: "throw",
  }
);

module.exports = vacinaModel = mongoose.model("vacinas", vacinaSchema);