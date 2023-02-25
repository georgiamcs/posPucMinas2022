import { RelacionamentoVacina } from '../classes/relacionamento-vacina.class';
export class ItemDescarteVacina {
  vacina: RelacionamentoVacina;
  lote: string;
  qtd_doses_descarte: number;
  justificativa_descarte: string;
}
