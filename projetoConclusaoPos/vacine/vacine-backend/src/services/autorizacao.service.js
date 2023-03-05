const SHAJS = require("sha.js");
const cnstAcesso = require("../setup/acesso");
const cnst = require("../constantes");

class AutorizacaoService {
  static checarTemPerfil = (req, tema, tiposAcessoExigidos) => {
    const usuario = req.user;
    const autorizacoesPerfil = cnstAcesso.getAutorizacoesPorPerfil(
      req.user.perfil_acesso
    );

    const retorno = autorizacoesPerfil.some(
      (iAut) =>
        iAut.tema == tema &&
        iAut.tiposAcesso.some((tp) => tiposAcessoExigidos.includes(tp))
    );
    return retorno;
  };

  static temAlgumPerfil = (req) => {
    let usuario = req.user;
    return usuario && !!usuario.perfil_acesso;
  };

  static isMesmoUsuario = (req, id) => {
    let usuario = req.user;

    return id == usuario._id;
  };

  static criptografar = (dado) => {
    return SHAJS("sha256").update(dado).digest("hex");
  };
}

module.exports = AutorizacaoService;
