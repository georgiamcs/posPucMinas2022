import { EntityModel } from "./entity.model";

export type TipoIdadeRecomendada = 'A' | 'M';
export class Vacina extends EntityModel {
  nome: string;
  protecao_contra: string;
  composicao: string;
  in_idade_recomendada: boolean;
  tp_idade_recomendada?: TipoIdadeRecomendada;
  nr_idade_recomendada?: number;
}
