const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CompraVacinaSchema = Schema({
  nota_fiscal: {
    type: String,
    required: true,
  },
  fornecedor: {
    _id: {
      type: String,
      required: true,
    },
    nome: {
      type: String,
      required: true,
    },
    cnpj: {
      type: String,
      required: true,
    },
  },
  data_compra: {
    type: Date,
    required: true,
  },
  vl_total_compra: {
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
  itens_compra: [
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
      qtd_frascos: {
        type: Number,
        required: true,
      },
      qtd_doses: {
        type: Number,
        required: true,
      },
      data_validade: {
        type: Date,
        required: true,
      },
      vl_total_item_compra: {
        type: Number,
        required: true,
      },
    },
  ],
});

module.exports = CompraVacinaModel = mongoose.model(
  "compras_vacinas",
  CompraVacinaSchema
);
