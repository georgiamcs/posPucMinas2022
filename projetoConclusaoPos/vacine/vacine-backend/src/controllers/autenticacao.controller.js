const cnst = require("../constantes");
const config = require("../setup/config");
const jwt = require("jsonwebtoken");
const AutorizacaoService = require("../services/autorizacao.service");
const UsuarioModel = require("../models/usuario.model");
const UsuarioService = require("../services/generic-crud.service");
const Acesso = require("../setup/acesso");

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(config.GOOGLE_CLIENT_ID);

function gerarToken(usuario) {
  return jwt.sign({ usuario }, config.PASSPORT.SECRET, {
    expiresIn: config.PASSPORT.EXPIRESIN,
  });
}

exports.loginJwt = async (req, res) => {
  try {
    let { email, senha } = req.body;
    let usuario = await UsuarioService.getOne(UsuarioModel, {
      email: email,
    });

    if (
      senha &&
      usuario &&
      usuario.senha == AutorizacaoService.criptografar(senha)
    ) {
      const autorizacoes = Acesso.getAutorizacoesPorPerfil(
        usuario.perfil_acesso
      );
      const usuarioObj = usuario.toObject();
      usuario = {
        _id: usuarioObj._id,
        nome: usuarioObj.nome,
        email: usuarioObj.email,
        perfil_acesso: usuarioObj.perfil_acesso,
        autorizacoes: autorizacoes,
      };
      // Sign token
      const token = gerarToken(usuario);
      res.status(cnst.RETORNO_HTTP.HTTP_OK).json({ token: token });
    } else {
      res
        .status(cnst.RETORNO_HTTP.HTTP_NOT_ACCEPTED)
        .json({ error: "Usuário ou senha inválidos" });
    }
  } catch (error) {
    res
      .status(cnst.RETORNO_HTTP.HTTP_INTERNAL_SERVER_ERRO)
      .json({ error: error.message });
  }
};

function criarUsuarioGoogle(obj) {
  let usuario = {};

  usuario.tipo = cnst.TIPO_USUARIO.CLIENTE;
  usuario.nome = obj.name;
  usuario.email = obj.email;
  usuario.senha = AutorizacaoService.criptografar(usuario.email);
  usuario.perfil_acesso = Acesso.PERFIL.CLIENTE;

  return usuario;
}

exports.loginGoogle = async (req, res) => {
  try {
    let token = null;

    const ticket = await client.verifyIdToken({
      idToken: req.body.idToken,
      audience: config.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    // Verificar se tem usuário cadastrado com o mesmo email
    let usuario = await UsuarioService.getOne(UsuarioModel, {
      email: payload.email,
    });

    // Se não tem cadastra
    if (!usuario) {
      const novo = criarUsuarioGoogle(payload);
      usuario = await UsuarioService.add(UsuarioModel, novo, undefined);
    }
    let autorizacoes = Acesso.getAutorizacoesPorPerfil(usuario.perfil_acesso);

    const usuarioObj = usuario.toObject();
    usuario = {
      _id: usuarioObj._id,
      nome: usuarioObj.nome,
      email: usuarioObj.email,
      perfil_acesso: usuarioObj.perfil_acesso,
      autorizacoes: autorizacoes,
    };
    token = gerarToken(usuario);
    res.status(200).json({ token: token });
  } catch (error) {
    res.status(500).json({
      error: `Não foi possível efetuar o login pelo Google: ${error.message}`,
    });
  }
};
