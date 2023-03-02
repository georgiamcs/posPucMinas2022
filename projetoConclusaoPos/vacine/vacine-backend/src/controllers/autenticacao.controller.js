const cnst = require("../constantes");
const config = require("../setup/config");
const jwt = require("jsonwebtoken");
const AutorizacaoService = require("../services/autorizacao.service");
const UsuarioModel = require("../models/usuario.model");
const UsuarioService = require("../services/generic-crud.service");
const Acesso = require("../setup/acesso");

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(config.GOOGLE_CLIENT_ID);

function gerarToken(login) {
  return jwt.sign({ email: login }, config.PASSPORT.SECRET, {
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
      // Sign token
      const token = gerarToken(email);
      let autorizacoes = Acesso.getAutorizacoesPorPerfil(usuario.perfil_acesso);
      usuario = { ...usuario.toObject(), autorizacoes: autorizacoes };

      let retorno = { usuario };
      retorno.token = token;
      delete retorno.usuario.senha;
      res.status(cnst.RETORNO_HTTP.HTTP_OK).json(retorno);
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
    token = gerarToken(usuario.email);
    let autorizacoes = Acesso.getAutorizacoesPorPerfil(usuario.perfil_acesso);
    usuario = { ...usuario.toObject(), autorizacoes: autorizacoes };

    let retorno = { usuario };
    retorno.token = token;
    delete retorno.usuario.senha;
    res.status(200).json(retorno);
  } catch (error) {
    res.status(500).json({
      error: `Não foi possível efetuar o login pelo Google: ${error.message}`,
    });
  }
};
