import { EntityModel } from "./entity.model";

export type TipoIdadeRecomendada = 'A' | 'M';
export class Vacina extends EntityModel {
  tx_nome: string;
  tx_protecao_contra: string;
  tx_composicao: string;
  in_idade_recomendada: boolean;
  tp_idade_recomendada?: TipoIdadeRecomendada;
  nr_idade_recomendada?: number;
}
