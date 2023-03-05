const AutorizacaoService = require("../../services/autorizacao.service");
const GenericCrudController = require("./generic-crud.controller");
const GenericService = require("../../services/generic-crud.service");
const UsuarioModel = require("../../models/usuario.model");
const VacinacaoModel = require("../../models/vacinacao.model");
const DescarteVacinaModel = require("../../models/descarte-vacina.model");
const Acesso = require("../../setup/acesso");
const cnst = require("../../constantes");

class UsuarioController extends GenericCrudController {
  constructor() {
    super(GenericService, UsuarioModel, Acesso.TEMA_ACESSO.USUARIO);
  }

  createUsuarioCliente(obj) {
    let usuario = this.createObj(obj);
    usuario.tipo = cnst.TIPO_USUARIO.CLIENTE;
    usuario.perfil_acesso = Acesso.PERFIL.CLIENTE;
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
    usuario.perfil_acesso = Acesso.getPerfilPorTipoUsuario(obj.tipo);
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
    return usuario;
  }

  async temDuplicado(obj, session, tipoOperacao) {
    if (!!obj.nome && !!obj.email) {
      const searchNome = obj.nome.trim();
      const searchEmail = obj.email.trim();
      let regBase = [];

      if (tipoOperacao === cnst.TIPO_OPERACAO.INSERT) {
        regBase = await GenericService.find(
          UsuarioModel,
          {
            $or: [
              { nome: { $regex: searchNome, $options: "i" } },
              { email: { $regex: searchEmail, $options: "i" } },
            ],
          },
          session,
          "_id"
        );
      } else if (tipoOperacao === cnst.TIPO_OPERACAO.UPDATE) {
        regBase = await GenericService.find(
          UsuarioModel,
          {
            $or: [
              { nome: { $regex: searchNome, $options: "i" } },
              { email: { $regex: searchEmail, $options: "i" } },
            ],
            _id: { $ne: obj._id },
          },
          session,
          "_id"
        );
      }
      return regBase.length > 0;
    } else {
      return false;
    }
  }

  async podeExcluir(id, session) {
    const regVacinacao = await GenericService.find(
      VacinacaoModel,
      {
        $or: [
          { "usuario_resp_cadastro._id": id },
          { "usuario_cliente._id": id },
          { "usuario_aplicador_vacina._id": id },
        ],
      },
      session,
      "_id"
    );

    const regDescarte = await GenericService.find(
      DescarteVacinaModel,
      { "usuario_resp_descarte._id": id },
      session,
      "_id"
    );

    return regVacinacao.length === 0 && regDescarte.length === 0;
  }

  getByTipos = async (req, res) => {
    if (
      AutorizacaoService.checarTemPerfil(req, this.temaAcesso, [
        Acesso.TIPO_ACESSO_USUARIO.VISUALIZAR_TODOS,
        Acesso.TIPO_ACESSO_USUARIO.VISUALIZAR_PROPRIO,
        Acesso.TIPO_ACESSO_USUARIO.SELECIONAR,
      ])
    ) {
      //parametro é passado como string separada por virgulas, precisa transformar em array
      const tipos = req.query.tipos.split(",");
      let registros;

      if (tipos) {
        registros = await this.service.find(
          this.objectModel,
          { tipo: { $in: tipos } },
          null,
          "_id nome cpf"
        );
      } else {
        return res
          .status(cnst.RETORNO_HTTP.HTTP_BAD_REQUEST)
          .json("Tipo não informado.");
      }

      try {
        if (!registros) {
          return res
            .status(cnst.RETORNO_HTTP.HTTP_NOT_FOUND)
            .json("Não existem usuários cadastrados.");
        }

        res.json(registros);
      } catch (err) {
        return res
          .status(cnst.RETORNO_HTTP.HTTP_INTERNAL_SERVER_ERRO)
          .json({ error: err.message });
      }
    } else {
      res
        .status(cnst.RETORNO_HTTP.HTTP_FORBIDEN)
        .json({ error: "Sem permissão para acessar o serviço." });
    }
  };

  getNomeById = async (req, res) => {
    if (
      AutorizacaoService.checarTemPerfil(req, this.temaAcesso, [
        Acesso.TIPO_ACESSO_USUARIO.VISUALIZAR_TODOS,
        Acesso.TIPO_ACESSO_USUARIO.VISUALIZAR_PROPRIO,
        Acesso.TIPO_ACESSO_USUARIO.SELECIONAR,
      ])
    ) {
      const id = req.params.id;
      this.verificaId(id, res);

      try {
        const registro = await this.service.getById(
          this.objectModel,
          id,
          undefined,
          "nome"
        );
        res.status(cnst.RETORNO_HTTP.HTTP_OK).json(registro.nome);
      } catch (error) {
        res
          .status(cnst.RETORNO_HTTP.HTTP_INTERNAL_SERVER_ERRO)
          .json({ error: error.message });
      }
    } else {
      res
        .status(cnst.RETORNO_HTTP.HTTP_FORBIDEN)
        .json({ error: "Sem permissão para acessar o serviço." });
    }
  };

  getById = async (req, res) => {
    if (
      AutorizacaoService.checarTemPerfil(req, this.temaAcesso, [
        Acesso.TIPO_ACESSO_USUARIO.VISUALIZAR_TODOS,
        Acesso.TIPO_ACESSO_USUARIO.VISUALIZAR_PROPRIO,
        Acesso.TIPO_ACESSO_USUARIO.SELECIONAR,
      ])
    ) {
      const id = req.params.id;
      this.verificaId(id, res);

      try {
        const registro = await this.service.getById(this.objectModel, id);
        if (registro) {
          let retorno = registro.toObject();
          delete retorno.senha;
          res.json(retorno);
        } else {
          res
            .status(cnst.RETORNO_HTTP.HTTP_NOT_FOUND)
            .json({ error: `Registro com Id ${id} não encontrado.` });
        }
      } catch (error) {
        res
          .status(cnst.RETORNO_HTTP.HTTP_INTERNAL_SERVER_ERRO)
          .json({ error: error.message });
      }
    } else {
      res
        .status(cnst.RETORNO_HTTP.HTTP_FORBIDEN)
        .json({ error: "Sem permissão para acessar o serviço." });
    }
  };

  getAll = async (req, res) => {
    if (
      AutorizacaoService.checarTemPerfil(req, this.temaAcesso, [
        Acesso.TIPO_ACESSO_USUARIO.VISUALIZAR_TODOS,
        Acesso.TIPO_ACESSO_USUARIO.VISUALIZAR_PROPRIO,
        Acesso.TIPO_ACESSO_USUARIO.SELECIONAR,
      ])
    ) {
      const tipo = req.query.tipo;
      let registros;

      if (!!tipo) {
        registros = await this.service.find(
          this.objectModel,
          { tipo: tipo },
          null,
          "_id nome cpf"
        );
      } else {
        registros = await this.service.getAll(this.objectModel);
      }

      try {
        if (!registros) {
          return res
            .status(cnst.RETORNO_HTTP.HTTP_NOT_FOUND)
            .json("Não existem registros cadastrados!");
        }
        let retorno;
        //removendo a senha do retorno
        if (Array.isArray(registros)) {
          retorno = registros.map((item) => {
            const { senha, ...dataWithoutSenha } = item.toObject();
            return { ...dataWithoutSenha };
          });
        } else {
          const { senha, ...dataWithoutSenha } = registros.toObject();
          retorno = dataWithoutSenha;
        }

        res.json(retorno);
      } catch (err) {
        return res
          .status(cnst.RETORNO_HTTP.HTTP_INTERNAL_SERVER_ERRO)
          .json({ error: err.message });
      }
    } else {
      res
        .status(cnst.RETORNO_HTTP.HTTP_FORBIDEN)
        .json({ error: "Sem permissão para acessar o serviço." });
    }
  };

  registrar = async (req, res) => {
    if (AutorizacaoService.isReqNovoUsuario(req.body)) {
      try {
        const regDuplicado = await this.temDuplicado(
          req.body,
          undefined,
          cnst.TIPO_OPERACAO.INSERT
        );

        if (!!regDuplicado) {
          res
            .status(cnst.RETORNO_HTTP.HTTP_CONFLIT)
            .json({ error: cnst.MENSAGEM.REGISTRO_DUPLICADO });
        } else {
          const novoUsuario = this.createUsuarioCliente(req.body);
          const regAdicionado = await this.service.add(
            this.objectModel,
            novoUsuario,
            undefined
          );
          res.status(cnst.RETORNO_HTTP.HTTP_CREATED).json(regAdicionado);
        }
      } catch (error) {
        res
          .status(cnst.RETORNO_HTTP.HTTP_INTERNAL_SERVER_ERRO)
          .json({ error: error.message });
      }
    } else {
      res
        .status(cnst.RETORNO_HTTP.HTTP_FORBIDEN)
        .json({ error: "Sem permissão para acessar o serviço." });
    }
  };

  trocarsenha = async (req, res) => {
    if (AutorizacaoService.temAlgumPerfil(req)) {
      let id = req.params.id;
      this.verificaId(id, res);

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
        .json({ error: "Sem permissão para acessar o serviço." });
    }
  };
}

module.exports = UsuarioController;
