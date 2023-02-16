import { EntityNomeModel } from "./entity-nome.model";
import { EntityModel } from "./entity.model";

export type TipoIdadeRecomendada = 'A' | 'M';
export class Vacina extends EntityNomeModel {
  protecao_contra: string;
  composicao: string;
  in_idade_recomendada: boolean;
  tp_idade_recomendada?: TipoIdadeRecomendada;
  nr_idade_recomendada?: number;
  estoque: number;
}
