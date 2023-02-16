const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FornecedorSchema = Schema({
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cnpj: {
    type: String,
    required: true,
  },
  endereco: {
    logradouro: {
      type: String,
      required: true,
    },
    numero: {
      type: String,
      required: true,
    },
    complemento: {
      type: String,
      required: false,
    },
    cidade: {
      type: String,
      required: true,
    },
    estado: {
      type: String,
      required: true,
    },
    cep: {
      type: String,
      required: true,
    },
  },
  tel_celular: {
    type: String,
    required: true,
  },
  tel_fixo: {
    type: String,
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

module.exports = FornecedorModel = mongoose.model(
  "fornecedores",
  FornecedorSchema
);
