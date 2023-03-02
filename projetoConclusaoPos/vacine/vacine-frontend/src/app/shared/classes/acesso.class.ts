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

  public static temAcessoVisualizarTodasVacinas(
    itens_acesso: ItemAutorizacaoUsuario[]
  ) {
    return this.temAcessoFuncionalidade(
      TemaAcessoUsuario.VACINA,
      [TipoAcessoUsuario.VISUALIZAR_TODOS],
      itens_acesso
    );
  }

  public static temAcessoIncluirVacina(itens_acesso: ItemAutorizacaoUsuario[]) {
    return this.temAcessoFuncionalidade(
      TemaAcessoUsuario.VACINA,
      [TipoAcessoUsuario.INCLUIR],
      itens_acesso
    );
  }

  public static temAcessoAlterarVacina(itens_acesso: ItemAutorizacaoUsuario[]) {
    return this.temAcessoFuncionalidade(
      TemaAcessoUsuario.VACINA,
      [TipoAcessoUsuario.ALTERAR],
      itens_acesso
    );
  }

  public static temAcessoExcluirVacina(itens_acesso: ItemAutorizacaoUsuario[]) {
    return this.temAcessoFuncionalidade(
      TemaAcessoUsuario.VACINA,
      [TipoAcessoUsuario.EXCLUIR],
      itens_acesso
    );
  }

  public static temAcessoVisualizarSuasVacinacoes(
    itens_acesso: ItemAutorizacaoUsuario[]
  ) {
    return this.temAcessoFuncionalidade(
      TemaAcessoUsuario.VACINACAO,
      [TipoAcessoUsuario.VISUALIZAR_PROPRIO],
      itens_acesso
    );
  }

  public static temAcessoVisualizarTodasVacinacoes(
    itens_acesso: ItemAutorizacaoUsuario[]
  ) {
    return this.temAcessoFuncionalidade(
      TemaAcessoUsuario.VACINACAO,
      [TipoAcessoUsuario.VISUALIZAR_TODOS],
      itens_acesso
    );
  }

  public static temAcessoIncluirVacinacao(
    itens_acesso: ItemAutorizacaoUsuario[]
  ) {
    return this.temAcessoFuncionalidade(
      TemaAcessoUsuario.VACINACAO,
      [TipoAcessoUsuario.INCLUIR],
      itens_acesso
    );
  }

  public static temAcessoAlterarVacinacao(
    itens_acesso: ItemAutorizacaoUsuario[]
  ) {
    return this.temAcessoFuncionalidade(
      TemaAcessoUsuario.VACINACAO,
      [TipoAcessoUsuario.ALTERAR],
      itens_acesso
    );
  }

  public static temAcessoExcluirVacinacao(
    itens_acesso: ItemAutorizacaoUsuario[]
  ) {
    return this.temAcessoFuncionalidade(
      TemaAcessoUsuario.VACINACAO,
      [TipoAcessoUsuario.EXCLUIR],
      itens_acesso
    );
  }

  public static temAcessoVisualizarTodasComprasVacinas(
    itens_acesso: ItemAutorizacaoUsuario[]
  ) {
    return this.temAcessoFuncionalidade(
      TemaAcessoUsuario.COMPRA_VACINA,
      [TipoAcessoUsuario.VISUALIZAR_TODOS],
      itens_acesso
    );
  }

  public static temAcessoIncluirCompraVacina(
    itens_acesso: ItemAutorizacaoUsuario[]
  ) {
    return this.temAcessoFuncionalidade(
      TemaAcessoUsuario.COMPRA_VACINA,
      [TipoAcessoUsuario.INCLUIR],
      itens_acesso
    );
  }

  public static temAcessoAlterarCompraVacina(
    itens_acesso: ItemAutorizacaoUsuario[]
  ) {
    return this.temAcessoFuncionalidade(
      TemaAcessoUsuario.COMPRA_VACINA,
      [TipoAcessoUsuario.ALTERAR],
      itens_acesso
    );
  }

  public static temAcessoExcluirCompraVacina(
    itens_acesso: ItemAutorizacaoUsuario[]
  ) {
    return this.temAcessoFuncionalidade(
      TemaAcessoUsuario.COMPRA_VACINA,
      [TipoAcessoUsuario.EXCLUIR],
      itens_acesso
    );
  }

  public static temAcessoVisualizarTodosFornecedoresVacina(
    itens_acesso: ItemAutorizacaoUsuario[]
  ) {
    return this.temAcessoFuncionalidade(
      TemaAcessoUsuario.FORNECEDOR_VACINA,
      [TipoAcessoUsuario.VISUALIZAR_TODOS],
      itens_acesso
    );
  }

  public static temAcessoIncluirFornecedorVacina(
    itens_acesso: ItemAutorizacaoUsuario[]
  ) {
    return this.temAcessoFuncionalidade(
      TemaAcessoUsuario.FORNECEDOR_VACINA,
      [TipoAcessoUsuario.INCLUIR],
      itens_acesso
    );
  }

  public static temAcessoAlterarFornecedorVacina(
    itens_acesso: ItemAutorizacaoUsuario[]
  ) {
    return this.temAcessoFuncionalidade(
      TemaAcessoUsuario.FORNECEDOR_VACINA,
      [TipoAcessoUsuario.ALTERAR],
      itens_acesso
    );
  }

  public static temAcessoExcluirFornecedorVacina(
    itens_acesso: ItemAutorizacaoUsuario[]
  ) {
    return this.temAcessoFuncionalidade(
      TemaAcessoUsuario.FORNECEDOR_VACINA,
      [TipoAcessoUsuario.EXCLUIR],
      itens_acesso
    );
  }

  public static temAcessoVisualizarTodosDescartesVacina(
    itens_acesso: ItemAutorizacaoUsuario[]
  ) {
    return this.temAcessoFuncionalidade(
      TemaAcessoUsuario.DESCARTE_VACINA,
      [TipoAcessoUsuario.VISUALIZAR_TODOS],
      itens_acesso
    );
  }

  public static temAcessoIncluirDescarteVacina(
    itens_acesso: ItemAutorizacaoUsuario[]
  ) {
    return this.temAcessoFuncionalidade(
      TemaAcessoUsuario.DESCARTE_VACINA,
      [TipoAcessoUsuario.INCLUIR],
      itens_acesso
    );
  }

  public static temAcessoAlterarDescarteVacina(
    itens_acesso: ItemAutorizacaoUsuario[]
  ) {
    return this.temAcessoFuncionalidade(
      TemaAcessoUsuario.DESCARTE_VACINA,
      [TipoAcessoUsuario.ALTERAR],
      itens_acesso
    );
  }

  public static temAcessoExcluirDescarteVacina(
    itens_acesso: ItemAutorizacaoUsuario[]
  ) {
    return this.temAcessoFuncionalidade(
      TemaAcessoUsuario.DESCARTE_VACINA,
      [TipoAcessoUsuario.EXCLUIR],
      itens_acesso
    );
  }

  public static temAcessoVisualizarSeuUsuario(
    itens_acesso: ItemAutorizacaoUsuario[]
  ) {
    return this.temAcessoFuncionalidade(
      TemaAcessoUsuario.USUARIO,
      [TipoAcessoUsuario.VISUALIZAR_PROPRIO],
      itens_acesso
    );
  }
  public static temAcessoVisualizarTodosUsuario(
    itens_acesso: ItemAutorizacaoUsuario[]
  ) {
    return this.temAcessoFuncionalidade(
      TemaAcessoUsuario.USUARIO,
      [TipoAcessoUsuario.VISUALIZAR_TODOS],
      itens_acesso
    );
  }

  public static temAcessoIncluirUsuario(
    itens_acesso: ItemAutorizacaoUsuario[]
  ) {
    return this.temAcessoFuncionalidade(
      TemaAcessoUsuario.USUARIO,
      [TipoAcessoUsuario.INCLUIR],
      itens_acesso
    );
  }

  public static temAcessoAlterarUsuario(
    itens_acesso: ItemAutorizacaoUsuario[]
  ) {
    return this.temAcessoFuncionalidade(
      TemaAcessoUsuario.USUARIO,
      [TipoAcessoUsuario.ALTERAR],
      itens_acesso
    );
  }

  public static temAcessoExcluirUsuario(
    itens_acesso: ItemAutorizacaoUsuario[]
  ) {
    return this.temAcessoFuncionalidade(
      TemaAcessoUsuario.USUARIO,
      [TipoAcessoUsuario.EXCLUIR],
      itens_acesso
    );
  }
}
