import { TipoMapa } from "./dominio-codigo-rotulo.model";

export type TipoIdadeRecomendada = 'A' | 'M';
export const DominioIdadeRecomendada: TipoMapa<TipoIdadeRecomendada> = {
  A: 'Anos',
  M: 'Meses'
};

export class Vacina {
  _id?: String;
  tx_nome: String;
  tx_protecao_contra: String;
  tx_composicao: String;
  in_idade_recomendada: Boolean;
  tp_idade_recomendada?: TipoIdadeRecomendada;
  nr_idade_recomendada?: Number;
  dt_inclusao?: Date;
  dt_alteracao?: Date;
}
/*
*/
