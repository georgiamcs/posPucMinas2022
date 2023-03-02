const cnst = require("../constantes");

class Acesso {
  static TIPO_ACESSO_USUARIO = Object.freeze({
    VISUALIZAR_TODOS: "VT",
    VISUALIZAR_PROPRIO: "VP",
    INCLUIR: "I",
    ALTERAR_PROPRIO: "AP",
    ALTERAR: "A",
    EXCLUIR: "E",
    SELECIONAR: "S",
  });

  static PERFIL = Object.freeze({
    ADMINISTRADOR: "ADMINISTRADOR",
    ANALISTA_COMPRAS: "ANALISTA_COMPRA",
    TECNICO_ENFERMAGEM: "TECNICO_ENFERMAGEM",
    SECRETARIA: "SECRETARIA",
    CLIENTE: "CLIENTE",
  });

  static TEMA_ACESSO = Object.freeze({
    COMPRA_VACINA: "CV",
    FORNECEDOR_VACINA: "FV",
    USUARIO: "U",
    VACINA: "V",
    VACINACAO: "S",
    DESCARTE_VACINA: "DV",
    INDICADORES: "I",
  });

  static getAutorizacoesPorPerfil(perfil) {
    let ret;

    switch (perfil) {
      case Acesso.PERFIL.ADMINISTRADOR:
        return [
          {
            tema: this.TEMA_ACESSO.USUARIO,
            tiposAcesso: [
              Acesso.TIPO_ACESSO_USUARIO.VISUALIZAR_TODOS,
              Acesso.TIPO_ACESSO_USUARIO.VISUALIZAR_PROPRIO,
              Acesso.TIPO_ACESSO_USUARIO.INCLUIR,
              Acesso.TIPO_ACESSO_USUARIO.ALTERAR_PROPRIO,
              Acesso.TIPO_ACESSO_USUARIO.ALTERAR,
              Acesso.TIPO_ACESSO_USUARIO.EXCLUIR,
              Acesso.TIPO_ACESSO_USUARIO.SELECIONAR,
            ],
          },
          {
            tema: this.TEMA_ACESSO.VACINA,
            tiposAcesso: [
              Acesso.TIPO_ACESSO_USUARIO.VISUALIZAR_TODOS,
              Acesso.TIPO_ACESSO_USUARIO.INCLUIR,
              Acesso.TIPO_ACESSO_USUARIO.ALTERAR,
              Acesso.TIPO_ACESSO_USUARIO.EXCLUIR,
              Acesso.TIPO_ACESSO_USUARIO.SELECIONAR,
            ],
          },
          {
            tema: this.TEMA_ACESSO.VACINACAO,
            tiposAcesso: [
              Acesso.TIPO_ACESSO_USUARIO.VISUALIZAR_TODOS,
              Acesso.TIPO_ACESSO_USUARIO.VISUALIZAR_PROPRIO,
              Acesso.TIPO_ACESSO_USUARIO.INCLUIR,
              Acesso.TIPO_ACESSO_USUARIO.ALTERAR,
              Acesso.TIPO_ACESSO_USUARIO.EXCLUIR,
            ],
          },
          {
            tema: this.TEMA_ACESSO.DESCARTE_VACINA,
            tiposAcesso: [
              Acesso.TIPO_ACESSO_USUARIO.VISUALIZAR_TODOS,
              Acesso.TIPO_ACESSO_USUARIO.INCLUIR,
              Acesso.TIPO_ACESSO_USUARIO.ALTERAR,
              Acesso.TIPO_ACESSO_USUARIO.EXCLUIR,
            ],
          },
          {
            tema: this.TEMA_ACESSO.COMPRA_VACINA,
            tiposAcesso: [
              Acesso.TIPO_ACESSO_USUARIO.VISUALIZAR_TODOS,
              Acesso.TIPO_ACESSO_USUARIO.INCLUIR,
              Acesso.TIPO_ACESSO_USUARIO.ALTERAR,
              Acesso.TIPO_ACESSO_USUARIO.EXCLUIR,
            ],
          },
          {
            tema: this.TEMA_ACESSO.FORNECEDOR_VACINA,
            tiposAcesso: [
              Acesso.TIPO_ACESSO_USUARIO.VISUALIZAR_TODOS,
              Acesso.TIPO_ACESSO_USUARIO.INCLUIR,
              Acesso.TIPO_ACESSO_USUARIO.ALTERAR,
              Acesso.TIPO_ACESSO_USUARIO.EXCLUIR,
              Acesso.TIPO_ACESSO_USUARIO.SELECIONAR,
            ],
          },
          {
            tema: this.TEMA_ACESSO.INDICADORES,
            tiposAcesso: [Acesso.TIPO_ACESSO_USUARIO.VISUALIZAR_TODOS],
          },
        ];

      case Acesso.PERFIL.ANALISTA_COMPRAS:
        return [
          {
            tema: this.TEMA_ACESSO.USUARIO,
            tiposAcesso: [
              Acesso.TIPO_ACESSO_USUARIO.VISUALIZAR_PROPRIO,
              Acesso.TIPO_ACESSO_USUARIO.ALTERAR_PROPRIO,
            ],
          },
          {
            tema: this.TEMA_ACESSO.VACINA,
            tiposAcesso: [
              Acesso.TIPO_ACESSO_USUARIO.VISUALIZAR_TODOS,
              Acesso.TIPO_ACESSO_USUARIO.INCLUIR,
              Acesso.TIPO_ACESSO_USUARIO.ALTERAR,
              Acesso.TIPO_ACESSO_USUARIO.SELECIONAR,
            ],
          },
          {
            tema: this.TEMA_ACESSO.VACINACAO,
            tiposAcesso: [
              Acesso.TIPO_ACESSO_USUARIO.VISUALIZAR_TODOS,
              Acesso.TIPO_ACESSO_USUARIO.VISUALIZAR_PROPRIO,
            ],
          },
          {
            tema: this.TEMA_ACESSO.DESCARTE_VACINA,
            tiposAcesso: [Acesso.TIPO_ACESSO_USUARIO.VISUALIZAR_TODOS],
          },
          {
            tema: this.TEMA_ACESSO.COMPRA_VACINA,
            tiposAcesso: [
              Acesso.TIPO_ACESSO_USUARIO.VISUALIZAR_TODOS,
              Acesso.TIPO_ACESSO_USUARIO.INCLUIR,
              Acesso.TIPO_ACESSO_USUARIO.ALTERAR,
              Acesso.TIPO_ACESSO_USUARIO.EXCLUIR,
            ],
          },
          {
            tema: this.TEMA_ACESSO.FORNECEDOR_VACINA,
            tiposAcesso: [
              Acesso.TIPO_ACESSO_USUARIO.VISUALIZAR_TODOS,
              Acesso.TIPO_ACESSO_USUARIO.INCLUIR,
              Acesso.TIPO_ACESSO_USUARIO.ALTERAR,
              Acesso.TIPO_ACESSO_USUARIO.EXCLUIR,
              Acesso.TIPO_ACESSO_USUARIO.SELECIONAR,
            ],
          },
          {
            tema: this.TEMA_ACESSO.INDICADORES,
            tiposAcesso: [Acesso.TIPO_ACESSO_USUARIO.VISUALIZAR_TODOS],
          },
        ];

      case Acesso.PERFIL.TECNICO_ENFERMAGEM:
        return [
          {
            tema: this.TEMA_ACESSO.USUARIO,
            tiposAcesso: [
              Acesso.TIPO_ACESSO_USUARIO.VISUALIZAR_TODOS,
              Acesso.TIPO_ACESSO_USUARIO.VISUALIZAR_PROPRIO,
              Acesso.TIPO_ACESSO_USUARIO.INCLUIR,
              Acesso.TIPO_ACESSO_USUARIO.ALTERAR_PROPRIO,
              Acesso.TIPO_ACESSO_USUARIO.ALTERAR,
              Acesso.TIPO_ACESSO_USUARIO.EXCLUIR,
              Acesso.TIPO_ACESSO_USUARIO.SELECIONAR,
            ],
          },
          {
            tema: this.TEMA_ACESSO.VACINA,
            tiposAcesso: [
              Acesso.TIPO_ACESSO_USUARIO.VISUALIZAR_TODOS,
              Acesso.TIPO_ACESSO_USUARIO.INCLUIR,
              Acesso.TIPO_ACESSO_USUARIO.ALTERAR,
              Acesso.TIPO_ACESSO_USUARIO.SELECIONAR,
            ],
          },
          {
            tema: this.TEMA_ACESSO.VACINACAO,
            tiposAcesso: [
              Acesso.TIPO_ACESSO_USUARIO.VISUALIZAR_TODOS,
              Acesso.TIPO_ACESSO_USUARIO.VISUALIZAR_PROPRIO,
              Acesso.TIPO_ACESSO_USUARIO.INCLUIR,
              Acesso.TIPO_ACESSO_USUARIO.ALTERAR,
              Acesso.TIPO_ACESSO_USUARIO.EXCLUIR,
            ],
          },
          {
            tema: this.TEMA_ACESSO.DESCARTE_VACINA,
            tiposAcesso: [
              Acesso.TIPO_ACESSO_USUARIO.VISUALIZAR_TODOS,
              Acesso.TIPO_ACESSO_USUARIO.INCLUIR,
              Acesso.TIPO_ACESSO_USUARIO.ALTERAR,
              Acesso.TIPO_ACESSO_USUARIO.EXCLUIR,
            ],
          },
          {
            tema: this.TEMA_ACESSO.COMPRA_VACINA,
            tiposAcesso: [],
          },
          {
            tema: this.TEMA_ACESSO.FORNECEDOR_VACINA,
            tiposAcesso: [],
          },
          {
            tema: this.TEMA_ACESSO.INDICADORES,
            tiposAcesso: [],
          },
        ];

      case Acesso.PERFIL.SECRETARIA:
        return [
          {
            tema: this.TEMA_ACESSO.USUARIO,
            tiposAcesso: [
              Acesso.TIPO_ACESSO_USUARIO.VISUALIZAR_TODOS,
              Acesso.TIPO_ACESSO_USUARIO.VISUALIZAR_PROPRIO,
              Acesso.TIPO_ACESSO_USUARIO.INCLUIR,
              Acesso.TIPO_ACESSO_USUARIO.ALTERAR_PROPRIO,
              Acesso.TIPO_ACESSO_USUARIO.ALTERAR,
              Acesso.TIPO_ACESSO_USUARIO.EXCLUIR,
              Acesso.TIPO_ACESSO_USUARIO.SELECIONAR,
            ],
          },
          {
            tema: this.TEMA_ACESSO.VACINA,
            tiposAcesso: [
              Acesso.TIPO_ACESSO_USUARIO.VISUALIZAR_TODOS,
              Acesso.TIPO_ACESSO_USUARIO.SELECIONAR,
            ],
          },
          {
            tema: this.TEMA_ACESSO.VACINACAO,
            tiposAcesso: [
              Acesso.TIPO_ACESSO_USUARIO.VISUALIZAR_TODOS,
              Acesso.TIPO_ACESSO_USUARIO.VISUALIZAR_PROPRIO,
              Acesso.TIPO_ACESSO_USUARIO.INCLUIR,
              Acesso.TIPO_ACESSO_USUARIO.ALTERAR,
              Acesso.TIPO_ACESSO_USUARIO.EXCLUIR,
            ],
          },
          {
            tema: this.TEMA_ACESSO.DESCARTE_VACINA,
            tiposAcesso: [],
          },
          {
            tema: this.TEMA_ACESSO.COMPRA_VACINA,
            tiposAcesso: [],
          },
          {
            tema: this.TEMA_ACESSO.FORNECEDOR_VACINA,
            tiposAcesso: [],
          },
          {
            tema: this.TEMA_ACESSO.INDICADORES,
            tiposAcesso: [],
          },
        ];

      case Acesso.PERFIL.CLIENTE:
        return [
          {
            tema: this.TEMA_ACESSO.USUARIO,
            tiposAcesso: [Acesso.TIPO_ACESSO_USUARIO.VISUALIZAR_PROPRIO],
          },
          {
            tema: this.TEMA_ACESSO.VACINA,
            tiposAcesso: [],
          },
          {
            tema: this.TEMA_ACESSO.VACINACAO,
            tiposAcesso: [Acesso.TIPO_ACESSO_USUARIO.VISUALIZAR_PROPRIO],
          },
          {
            tema: this.TEMA_ACESSO.DESCARTE_VACINA,
            tiposAcesso: [],
          },
          {
            tema: this.TEMA_ACESSO.COMPRA_VACINA,
            tiposAcesso: [],
          },
          {
            tema: this.TEMA_ACESSO.FORNECEDOR_VACINA,
            tiposAcesso: [],
          },
          {
            tema: this.TEMA_ACESSO.INDICADORES,
            tiposAcesso: [],
          },
        ];

      default:
        throw new Error(`Perfil inválido ${perfil}`);
    }
  }

  static getPerfilPorTipoUsuario(tpUsuario) {
    switch (tpUsuario) {
      case cnst.TIPO_USUARIO.ADMINISTRADOR:
        return Acesso.PERFIL.ADMINISTRADOR;

      case cnst.TIPO_USUARIO.ANALISTA_COMPRAS:
        return Acesso.PERFIL.ANALISTA_COMPRAS;

      case cnst.TIPO_USUARIO.TECNICO_ENFERMAGEM:
        return Acesso.PERFIL.TECNICO_ENFERMAGEM;

      case cnst.TIPO_USUARIO.SECRETARIA:
        return Acesso.PERFIL.SECRETARIA;

      case cnst.TIPO_USUARIO.CLIENTE:
        return Acesso.PERFIL.CLIENTE;

      default:
        throw new Error(`Tipo de usuário inválido ${tpUsuario}`);
    }
  }
}

module.exports = Acesso;
