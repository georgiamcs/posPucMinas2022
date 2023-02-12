const cnst = require("../constantes");
const config = require("../setup/config");
const jwt = require("jsonwebtoken");
const { AutorizacaoService } = require("../services/AutorizacaoService");
const UsuarioModel = require("../models/UsuarioModel");
const UsuarioService = require("../services/GenericCrudService");

// const { OAuth2Client } = require("google-auth-library");
// const client = new OAuth2Client(Config.GOOGLE_CLIENT_ID);

function gerarToken(login) {
  return jwt.sign({ email: login }, config.PASSPORT.SECRET, {
    expiresIn: config.PASSPORT.EXPIRESIN,
  });
}

exports.login = async (req, res) => {
  try {
    let { email, senha } = req.body;
    const usuario = await UsuarioService.findOne(UsuarioModel, { email: email });

    if (
      senha &&
      usuario &&
      usuario.senha == AutorizacaoService.criptografar(senha)
    ) {
      // Sign token
      const token = gerarToken(email);

      let retorno = { usuario: usuario.toObject() };
      retorno.token = token;
      delete retorno.usuario.senha;
      res.status(cnst.RETORNO_HTTP.HTTP_OK).json(retorno);
    } else {
      res
        .status(cnst.RETORNO_HTTP.HTTP_NOT_FOUND)
        .json({ error: "Usuário ou senha inválidos" });
    }
  } catch (error) {
    res
      .status(cnst.RETORNO_HTTP.HTTP_INTERNAL_SERVER_ERRO)
      .json({ error: error.message });
  }
};

/*
//https://medium.com/@kishore8497/google-authentication-using-angular-and-nodejs-86b76a72ee80
exports.loginGoogle = async (req, res) => {
  try {
    let usuario = null;
    let token = null;

    const ticket = await client.verifyIdToken({
      idToken: req.body.idToken,
      audience: Config.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    console.log("payload", payload);
    // Consultando para ver se tem um usuário cadastrado
    const usuarios = await UsuarioService.find({ email: payload.email });
    if (usuarios && usuarios.length == 0) {
      // Se não tem cadastra
      const novo = {
        nome: payload.name,
        login: payload.email,
        email: payload.email,
        senha: "",
        roles: [ROLES.CLIENTE],
      };

      usuario = await UsuarioService.addUsuario(novo);
    } else if (usuarios && usuarios.length == 1) {
      //https://stackoverflow.com/questions/23342558/why-cant-i-delete-a-mongoose-models-object-properties
      usuario = usuarios[0];
    }
    if (usuario) {
      // Sign token
      token = gerarToken(usuario.login);

      let retorno = { usuario: usuario.toObject() };
      retorno.token = token;
      delete retorno.usuario.senha;
      res.status(200).json(retorno);
    } else {
      res
        .status(404)
        .json({ error: "Não foi possível efetuar o login pelo Google." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; */
