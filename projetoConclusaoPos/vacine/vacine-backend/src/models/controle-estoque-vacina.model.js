const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ControleEstoqueVacinaSchema = Schema(
  {
    vacina: {
      _id: {
        type: String,
        required: true,
      },
      nome: {
        type: String,
        required: true,
      },
    },
    usuario: {
      _id: {
        type: String,
        required: true,
      },
      nome: {
        type: String,
        required: true,
      },
      cpf: {
        type: String,
        required: false,
      },
    },
    data_evento: {
      type: String,
      required: true,
    },
    tipo_evento: {
      type: String,
      required: true,
    },
    tipo_motivo: {
      type: String,
      required: true,
    },
    descricao_evento: {
      type: String,
      required: false,
    },
    id_entidade_relac_evento: {
      type: String,
      required: true,
    },
    qtd_estoque_antes: {
      type: Number,
      required: true,
    },
    qtd_estoque_depois: {
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

module.exports = CompraVacinaModel = mongoose.model(
  "controle_estoque_vacinas",
  ControleEstoqueVacinaSchema
);
