const SHAJS = require("sha.js");
const cnstAcesso = require("../setup/acesso")

class AutorizacaoService {
  static checarPerfis = (req, perfis) => {
    let usuario = req.user;
    let retorno = false;

    if (perfis && perfis.length > 0) {
      if (usuario && usuario.perfis) {
        for (let i in perfis) {
          retorno = retorno || usuario.perfis.indexOf(perfis[i]) >= 0;
        }
      }
    }
    return retorno;
  };

  static isReqNovoUsuario = (body) => {
    let perfis = body.perfis;
    return perfis && perfis.length == 1 && perfis.indexOf(cnstAcesso.PERFIL.CLIENTE) >= 0;
  };

  static criptografar = (dado) => {
    return SHAJS("sha256").update(dado).digest("hex");
  };
}

module.exports = {
  AutorizacaoService: AutorizacaoService
};