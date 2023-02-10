const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsuarioSchema = Schema({
  tipo: {
    type: String,
    required: true,
  },
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cpf: {
    type: String,
    required: false,
  },
  endereco: {
    logradouro: {
      type: String,
      required: false,
    },
    numero: {
      type: String,
      required: false,
    },
    complemento: {
      type: String,
      required: false,
    },
    cep: {
      type: String,
      required: false,
    },
  },
  tel_celular: {
    type: String,
    required: false,
  },
  tel_fixo: {
    type: String,
    required: false,
  },
  senha: {
    type: String,
    required: true,
  },
  perfis: [
    {
      type: String,
      required: true,
    },
  ],
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

module.exports = UsuarioModel = mongoose.model("usuarios", UsuarioSchema);
