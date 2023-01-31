import { TipoMapa } from "./dominio-codigo-rotulo.model";

export type TipoIdadeRecomendada = 'A' | 'M';
export const DominioIdadeRecomendada: TipoMapa<TipoIdadeRecomendada> = {
  A: 'Anos',
  M: 'Meses'
};

export class Vacina {
  id?: String;
  nome: String;
  protecaoContra: String;
  composicao: String;
  temIdadeRecomendada: Boolean;
  tipoIdadeRecomendada?: TipoIdadeRecomendada;
  vlIdadeRecomemendada?: Number;
  dataInclusao?: Date;
  dataAlteracao?: Date;
}
/*
*/
