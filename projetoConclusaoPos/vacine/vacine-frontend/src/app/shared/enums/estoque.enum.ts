export enum TipoEventoControleEstoque {
  ENTRADA = 'E',
  SAIDA = 'S',
}

export enum TipoMotivoControleEstoqueVacina {
  CADASTRO_INICIAL = 'I',
  DESCARTE = 'D',
  VACINACAO = 'V',
  COMPRA = 'C',
  AJUSTE_ESTOQUE = 'A',
  ALTERACAO_COMPRA = 'AC',
  ALTERACAO_VACINACAO = 'AV',
  ALTERACAO_DESCARTE = 'AD',
  EXCLUSAO_COMPRA = 'EC',
  EXCLUSAO_VACINACAO = 'EV',
  EXCLUSAO_DESCARTE = 'ED',
}

export function getDescTipoEventoContEstoque(tpEvento: string): string {
  switch (tpEvento) {
    case TipoEventoControleEstoque.ENTRADA:
      return "Entrada";

    case TipoEventoControleEstoque.SAIDA:
      return "Saída";
  }
  return '';
}

export function getDescTpMotivoControleEstVacina(
  tpMotivo: string
): string {
  switch (tpMotivo) {
    case TipoMotivoControleEstoqueVacina.CADASTRO_INICIAL:
      return 'Cadastro';

    case TipoMotivoControleEstoqueVacina.DESCARTE:
      return 'Descarte';

    case TipoMotivoControleEstoqueVacina.VACINACAO:
      return 'Vacinação';

    case TipoMotivoControleEstoqueVacina.COMPRA:
      return 'Compra';

    case TipoMotivoControleEstoqueVacina.AJUSTE_ESTOQUE:
      return 'Alteração manual do estoque';

    case TipoMotivoControleEstoqueVacina.ALTERACAO_COMPRA:
      return 'Alteração da compra';

    case TipoMotivoControleEstoqueVacina.ALTERACAO_VACINACAO:
      return 'Alteração dos itens de vacinação';

    case TipoMotivoControleEstoqueVacina.ALTERACAO_DESCARTE:
      return 'Alteração dos itens de descarte';

    case TipoMotivoControleEstoqueVacina.EXCLUSAO_COMPRA:
      return 'Exclusão de compra';

    case TipoMotivoControleEstoqueVacina.EXCLUSAO_VACINACAO:
      return 'Exclusão de vacinação';

    case TipoMotivoControleEstoqueVacina.EXCLUSAO_DESCARTE:
      return 'Exclusão de descarte';
  }
  return '';
}
