export enum TipoEventoControleEstoque {
  ENTRADA = 'E',
  SAIDA = 'S',
}

export enum TipoMotivoControleEstoqueVacina {
  CADASTRO_INICIAL =  'I',
  DESCARTE =  'D',
  VACINACAO =  'V',
  COMPRA =  'C',
  AJUSTE_ESTOQUE =  'A',
  ALTERACAO_COMPRA =  'AC',
  ALTERACAO_VACINACAO =  'AV',
  EXCLUSAO_COMPRA =  'EC',
  EXCLUSAO_VACINACAO =  'EV',
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

    case TipoMotivoControleEstoqueVacina.COMPRA:
      return 'Compra';

    case TipoMotivoControleEstoqueVacina.AJUSTE_ESTOQUE:
      return 'Alteração manual do estoque';

    case TipoMotivoControleEstoqueVacina.ALTERACAO_COMPRA:
      return 'Alteração da compra';

    case TipoMotivoControleEstoqueVacina.ALTERACAO_VACINACAO:
      return 'Alteração das informações de vacinação';

    case TipoMotivoControleEstoqueVacina.EXCLUSAO_COMPRA:
      return 'Exclusão de compra';

    case TipoMotivoControleEstoqueVacina.EXCLUSAO_VACINACAO:
      return 'Exclusão de vacinação';
  }
  return '';
}
