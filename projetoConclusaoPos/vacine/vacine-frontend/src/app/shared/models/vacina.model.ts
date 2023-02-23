import { EntityNomeModel } from './entity-nome.model';
export class Vacina extends EntityNomeModel {
  protecao_contra: string;
  composicao: string;
  qtd_doses_estoque: number;
  vl_atual_unit_dose: number;
}
