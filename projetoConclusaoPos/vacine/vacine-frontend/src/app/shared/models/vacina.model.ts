export type TipoIdadeRecomendada = 'A' | 'M';

export class Vacina {
  _id?: string | null = null;
  tx_nome: string;
  tx_protecao_contra: string;
  tx_composicao: string;
  in_idade_recomendada: boolean;
  tp_idade_recomendada?: TipoIdadeRecomendada;
  nr_idade_recomendada?: number;
  dt_inclusao?: Date;
  dt_alteracao?: Date;
}
