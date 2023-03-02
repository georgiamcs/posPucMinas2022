import { ItemAutorizacaoUsuario } from './../models/item-autorizacao-usuario.model';

export enum TipoPerfil {
  ADMINISTRADOR = 'ADMINISTRADOR',
  ANALISTA_COMPRAS = 'ANALISTA_COMPRA',
  TECNICO_ENFERMAGEM = 'TECNICO_ENFERMAGEM',
  SECRETARIA = 'SECRETARIA',
  CLIENTE = 'CLIENTE',
}

export enum TemaAcessoUsuario {
  COMPRA_VACINA = "CV",
  FORNECEDOR_VACINA = "FV",
  USUARIO = "U",
  VACINA = "V",
  VACINACAO = "S",
  DESCARTE_VACINA = "DV",
  INDICADORES = "I",
}

export enum TipoAcessoUsuario {
  VISUALIZAR_TODOS = 'VT',
  VISUALIZAR_PROPRIO = 'VP',
  INCLUIR = 'I',
  ALTERAR_PROPRIO = 'AP',
  ALTERAR = 'A',
  EXCLUIR = 'E',
  SELECIONAR = 'S',
}

export class Acesso {
  public static temAcessoFuncionalidade(
    tema: TemaAcessoUsuario,
    tiposAcesso: TipoAcessoUsuario[],
    itensAutUsuario?: ItemAutorizacaoUsuario[]
  ): boolean {
    let ret: boolean = false;

    if (
      !!tema &&
      itensAutUsuario != undefined &&
      tiposAcesso != undefined &&
      itensAutUsuario.length > 0 &&
      tiposAcesso.length > 0
    ) {
      ret = itensAutUsuario.some(
        (iAut) =>
          iAut.tema == tema &&
          iAut.tiposAcesso.some((tp) => tiposAcesso.includes(tp))
      );
    }

    return ret;
  }

  public static getDescricaoPerfil(tpPerfil?: TipoPerfil) {

    switch (tpPerfil) {
      case TipoPerfil.ADMINISTRADOR:
        return 'ADMINISTRATIVO';

      case TipoPerfil.ANALISTA_COMPRAS:
        return 'COMPRAS';

      case TipoPerfil.TECNICO_ENFERMAGEM:
        return 'APLICAÇÃO VACINAS';

      case TipoPerfil.SECRETARIA:
        return 'SECRETARIA';

      case TipoPerfil.CLIENTE:
        return 'CLIENTE';

      default:
        throw new Error(`Perfil inválido ${tpPerfil}`);
    }

  }
}
