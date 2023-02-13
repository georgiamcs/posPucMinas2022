const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CompraVacinaSchema = Schema({
  fornecedor_id: {
    type: String,
    required: true,
  },
  fornecedor_nome: {
    type: String,
    required: true,
  },
  fornecedor_cnpj: {
    type: String,
    required: true,
  },
  nota_fiscal: {
    type: String,
    required: true,
  },
  data_compra: {
    type: Date,
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
      id_vacina: {
        type: String,
        required: true,
      },
      nome_vacina: {
        type: String,
        required: true,
      },
      protecao_contra_vacina: {
        type: String,
        required: true,
      },
      lote_vacina: {
        type: String,
        required: true,
      },
      qtd_frascos: {
        type: Number,
        required: true,
      },
      qtd_doses_compra: {
        type: Number,
        required: true,
      },
      qtd_doses_disponivel: {
        type: Number,
        required: true,
      },
      data_validade: {
        type: Date,
        required: true,
      },
    },
  ],
});

module.exports = CompraVacinaModel = mongoosemodel(
  "compra_vacinas",
  CompraVacinaSchema
);
