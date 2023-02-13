const { AutorizacaoService } = require("../../services/AutorizacaoService");
const GenericCrudController = require("./GenericCrudController");
const UsuarioService = require("../../services/GenericCrudService");
const UsuarioModel = require("../../models/UsuarioModel");
const Acesso = require("../../setup/acesso");
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

function createUsuarioCliente(obj) {
  let usuario = createUsuario(obj);
  usuario.tipo = cnst.TIPO_USUARIO.CLIENTE;
  usuario.perfis = [Acesso.PERFIL.CLIENTE];
  return usuario;
}

function createObjSenhaUsuario(obj) {
  let usuario = {};
  usuario.senha = AutorizacaoService.criptografar(obj.senha);
  return usuario;
}


class UsuarioController extends GenericCrudController {
  constructor() {
    const perfisRequeridosUsuario = Acesso.getPerfisPorTema(
      Acesso.TEMA.USUARIO
    );

    super(UsuarioService, UsuarioModel, perfisRequeridosUsuario, createUsuario);
  }

  registrar = async (req, res) => {
    if (AutorizacaoService.isReqNovoUsuario(req.body)) {
      try {
        const regAdicionado = await this.service.add(
          this.objectModel,
          createUsuarioCliente,
          req.body
        );
        res.status(cnst.RETORNO_HTTP.HTTP_CREATED).json(regAdicionado);
      } catch (error) {
        res
          .status(cnst.RETORNO_HTTP.HTTP_INTERNAL_SERVER_ERRO)
          .json({ error: error.message });
      }
    } else {
      res
        .status(cnst.RETORNO_HTTP.HTTP_FORBIDEN)
        .json({ error: "Acesso negado" });
    }
  };

  trocarsenha = async (req, res) => {
    if (AutorizacaoService.checarPerfis(req, Acesso.getPerfisPorTema(Acesso.TEMA.CLIENTE))) {
      let id = req.params.id;

      try {
        let regAlterado = createObjSenhaUsuario(req.body);
        const regAtualizado = await this.service.update(
          this.objectModel,
          id,
          regAlterado
        );

        if (regAtualizado.nModified === 0) {
          return res.status(cnst.RETORNO_HTTP.HTTP_NOT_FOUND).json({});
        }

        res.json(regAtualizado);
      } catch (error) {
        res
          .status(cnst.RETORNO_HTTP.HTTP_INTERNAL_SERVER_ERRO)
          .json({ error: error.message });
      }
    } else {
      res
        .status(cnst.RETORNO_HTTP.HTTP_FORBIDEN)
        .json({ error: "Acesso negado" });
    }
  };
}

module.exports = UsuarioController;
