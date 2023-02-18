import { RelacionamentoVacina } from './../classes/relacionamento-vacina.class';
export class ItemCompraVacina {
  vacina: RelacionamentoVacina;
  lote: string;
  qtd_frascos: number;
  qtd_doses: number;
  data_validade: Date;
  vl_total_item_compra: number;
}
