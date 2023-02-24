const { AutorizacaoService } = require("../../services/autorizacao.service");
const GenericCrudController = require("./generic-crud.controller");
const UsuarioService = require("../../services/generic-crud.service");
const UsuarioModel = require("../../models/usuario.model");
const Acesso = require("../../setup/acesso");
const cnst = require("../../constantes");

class UsuarioController extends GenericCrudController {
  constructor() {
    const perfisRequeridosUsuario = Acesso.getPerfisPorTema(
      Acesso.TEMA.USUARIO
    );

    super(UsuarioService, UsuarioModel, perfisRequeridosUsuario);
  }

  createUsuarioCliente(obj) {
    let usuario = createUsuario(obj);
    usuario.tipo = cnst.TIPO_USUARIO.CLIENTE;
    usuario.perfis = [Acesso.PERFIL.CLIENTE];
    return usuario;
  }

  createObjSenhaUsuario(obj) {
    let usuario = {};
    usuario.senha = AutorizacaoService.criptografar(obj.senha);
    return usuario;
  }

  createObj(obj, user) {
    let usuario = {};
    usuario.tipo = obj.tipo;
    usuario.nome = obj.nome;
    usuario.email = obj.email;
    usuario.cpf = obj.cpf;
    usuario.data_nascimento = obj.data_nascimento;
    usuario.endereco = obj.endereco;
    usuario.tel_celular = obj.tel_celular;
    usuario.tel_fixo = obj.tel_fixo;
    if (!!obj.senha) {
      //caso de alteracao em que nao envia a senha
      usuario.senha = AutorizacaoService.criptografar(obj.senha);
    }
    usuario.perfis = obj.perfis;
    return usuario;
  }

  async temDuplicado(obj, session, tipoOperacao) {
    const searchNome = obj.nome.trim();
    const searchEmail = obj.email.trim();
    let regBase = [];

    if (tipoOperacao === cnst.TIPO_OPERACAO.INSERT) {
      regBase = await UsuarioService.find(
        UsuarioModel,
        {
          $or: [{ nome: searchNome }, { email: searchEmail }],
          _id: { $ne: obj._id },
        },
        session,
        "_id"
      );
    } else if (tipoOperacao === cnst.TIPO_OPERACAO.UPDATE) {
      regBase = await UsuarioService.find(
        UsuarioModel,
        {
          $or: [{ nome: searchNome }, { email: searchEmail }],
        },
        session,
        "_id"
      );
    }
    return regBase.length > 0;
  }

  getNomeById = async (req, res) => {
    const id = req.params.id;
    if (
      AutorizacaoService.checarPerfis(req, this.perfisRequeridos) ||
      AutorizacaoService.isMesmoUsuario(req, id)
    ) {
      try {
        const registro = await this.service.getById(this.objectModel, id);
        res.status(cnst.RETORNO_HTTP.HTTP_OK).json(registro.nome);
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

  getByTipo = async (req, res) => {
    const tipo = req.params.tipo;

    if (AutorizacaoService.checarPerfis(req,  Acesso.getPerfisPorTema(Acesso.TEMA.VACINACAO))) {
      try {
        const registro = await this.service.find(this.objectModel, {"tipo": tipo}, null, "_id nome cpf");
        res.status(cnst.RETORNO_HTTP.HTTP_OK).json(registro);
      } catch (error) {
        res
          .status(cnst.RETORNO_HTTP.HTTP_INTERNAL_SERVER_ERRO)
          .json({ error: error.message });
      }
    } else {
      res
        .status(cnst.RETORNO_HTTP.HTTP_FORBIDEN)
        .json({ error: "Acesso negado!!" });
    }
  };

  registrar = async (req, res) => {
    if (AutorizacaoService.isReqNovoUsuario(req.body)) {
      try {
        const regAdicionado = await this.service.add(
          this.objectModel,
          this.createUsuarioCliente,
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
    if (AutorizacaoService.temAlgumPerfil(req)) {
      let id = req.params.id;
      try {
        let regAlterado = this.createObjSenhaUsuario(req.body);
        const regAtualizado = await this.service.update(
          this.objectModel,
          id,
          regAlterado
        );

        if (regAtualizado.modifiedCount === 0) {
          return res.status(cnst.RETORNO_HTTP.HTTP_NOT_FOUND).json({
            error: `Senha do usuário com id ${id} não foi atualizada`,
          });
        }

        res.status(cnst.RETORNO_HTTP.HTTP_OK).json(regAtualizado);
      } catch (error) {
        res.status(cnst.RETORNO_HTTP.HTTP_INTERNAL_SERVER_ERRO).json({
          error: `Senha do usuário com id ${id} não foi atualizada. Erro => ${error.message}`,
        });
      }
    } else {
      res
        .status(cnst.RETORNO_HTTP.HTTP_FORBIDEN)
        .json({ error: "Acesso negado" });
    }
  };
}

module.exports = UsuarioController;
