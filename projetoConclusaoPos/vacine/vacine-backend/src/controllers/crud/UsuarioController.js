const { AutorizacaoService } = require("../../services/AutorizacaoService");
const GenericCrudController = require("./GenericCrudController");
const UsuarioService = require("../../services/GenericCrudService");
const UsuarioModel = require("../../models/UsuarioModel");
const cnst = require("../../constantes");

function createUsuario(obj) {
  let usuario = {};
  usuario.tipo = obj.tipo;
  usuario.nome = obj.nome;
  usuario.email = obj.email;
  usuario.cpf = obj.cnpj;
  usuario.endereco = obj.endereco;
  usuario.tel_celular = obj.tel_celular;
  usuario.tel_fixo = obj.tel_fixo;
  usuario.senha = AutorizacaoService.criptografar(obj.senha);
  usuario.perfis = obj.perfis;
  return usuario;
}

const perfisRequeridosUsuario = [
  cnst.PERFIS.ADMINISTRADOR,
  cnst.PERFIS.SECRETARIA,
];

class UsuarioController extends GenericCrudController {
  constructor() {
    super(UsuarioService, UsuarioModel, perfisRequeridosUsuario, createUsuario);
  }
}

module.exports = UsuarioController;
