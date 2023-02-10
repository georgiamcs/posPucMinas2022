const SHAJS = require("sha.js");


const ROLES = Object.freeze({
  ADMIN: "ADMINISTRADOR",
  VENDEDOR: "VENDEDOR",
  ESTOQUE: "ESTOQUE",
  CLIENTE: "CLIENTE",
  MASTER: "MASTER",
});

class AutorizacaoService {
  static validarRoles = (req, roles) => {
    
    let usuario = req.user;
    let retorno = false;

    console.log("validarRoles", usuario);
    if (roles && roles.length > 0) {
      if (usuario && usuario.roles) {
        for (let i in roles) {
          retorno = retorno || usuario.roles.indexOf(roles[i]) > -1;
        }
      }
    }

    return retorno;
  };

  static isMesmoUsuario = (req, id) => {
    let usuario = req.user;

    return id == usuario._id;
  };

  static isNovoUsuarioCliente = (body) => {
    let roles = body.roles;
    return roles && roles.length == 1 && roles.indexOf(ROLES.CLIENTE) > -1;
  };

  static criptografar = (dado) => {
    return SHAJS("sha256").update(dado).digest("hex");
  };
}

module.exports = {
  AutorizacaoService: AutorizacaoService,
  ROLES: ROLES,
};