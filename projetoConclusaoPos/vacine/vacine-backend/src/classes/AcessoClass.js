class Acesso {
  static PERFIL = Object.freeze({
    ADMINISTRADOR: "ADMIN",
    CLIENTE: "CLIENTE",
    CADASTRADOR_COMPRA: "CAD-COMPRA",
    CADASTRADOR_FORNECEDOR: "CAD-FORNECEDOR",
    CADASTRADOR_USUARIO: "CAD-USUARIO",
    CADASTRADOR_VACINA: "CAD-VACINA",
    CADASTRADOR_VACINACAO: "CAD-VACINACAO",
  });

  static TEMA = Object.freeze({
    COMPRA: 1,
    FORNECEDOR: 2,
    USUARIO: 3,
    VACINA: 4,
    VACINACAO: 5,
  });

  static getPerfisPorTema(tema) {
    switch (tema) {
      case this.TEMA.COMPRA:
        return [this.PERFIL.ADMINISTRADOR, this.PERFIL.CADASTRADOR_COMPRA];

      case this.TEMA.FORNECEDOR:
        return [this.PERFIL.ADMINISTRADOR, this.PERFIL.CADASTRADOR_FORNECEDOR];

      case this.TEMA.VACINA:
        return [this.PERFIL.ADMINISTRADOR, this.PERFIL.CADASTRADOR_VACINA];

      case this.TEMA.VACINACAO:
        return [this.PERFIL.ADMINISTRADOR, this.PERFIL.CADASTRADOR_VACINACAO];

      case this.TEMA.USUARIO:
        return [this.PERFIL.ADMINISTRADOR, this.PERFIL.CADASTRADOR_USUARIO];

      default:
        return [];
    }
  }
}

module.exports = Acesso;
