const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DescarteVacinaSchema = Schema(
  {
    codigo: {
      type: String,
      required: true,
    },
    usuario_resp_descarte: {
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
    data_descarte: {
      type: Date,
      required: true,
    },
    motivo_descarte: {
      type: String,
      required: true,
    },
    justificativa_descarte: {
      type: String,
      required: true,
    },
    local_descarte: {
      type: String,
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
    itens_descarte: [
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
          protecao_contra: {
            type: String,
            required: true,
          },
        },
        lote: {
          type: String,
          required: true,
        },
        qtd_doses_descarte: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    strictQuery: "throw",
  }
);

module.exports = DescarteVacinaModel = mongoose.model(
  "descarte-vacinas",
  DescarteVacinaSchema
);
