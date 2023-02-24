const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VacinacaSchema = Schema(
  {
    codigo: {
      type: String,
      required: true,
    },
    usuario_resp_cadastro: {
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
    usuario_cliente: {
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
    usuario_aplicador_vacina: {
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
    data_aplicacao: {
      type: Date,
      required: true,
    },
    vl_total: {
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
    itens_vacinacao: [
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
        data_validade: {
          type: Date,
          required: true,
        },
        vl_item: {
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

module.exports = vacinacaoModel = mongoose.model("vacinacoes", VacinacaSchema);
