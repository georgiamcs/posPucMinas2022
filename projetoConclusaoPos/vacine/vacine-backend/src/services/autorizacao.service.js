const SHAJS = require("sha.js");
const cnstAcesso = require("../setup/acesso")

class AutorizacaoService {
  static checarPerfis = (req, perfis) => {
    let usuario = req.user;
    let retorno = false;

    if (perfis && perfis.length > 0) {
      if (usuario && usuario.perfis) {
        for (let i in perfis) {
          retorno = retorno || usuario.perfis.indexOf(perfis[i]) > -1;
        }
      }
    }
    return retorno;
  };

  static temAlgumPerfil = (req) => {
    let usuario = req.user;
    return usuario && usuario.perfis.length > 0;
  };

  static isMesmoUsuario = (req, id) => {
    let usuario = req.user;

    return id == usuario._id;
  };

  static isReqNovoUsuario = (body) => {
    let perfis = body.perfis;

    return perfis == cnstAcesso.PERFIL.CLIENTE;
  };

  static criptografar = (dado) => {
    return SHAJS("sha256").update(dado).digest("hex");
  };
}

module.exports = {
  AutorizacaoService: AutorizacaoService
};