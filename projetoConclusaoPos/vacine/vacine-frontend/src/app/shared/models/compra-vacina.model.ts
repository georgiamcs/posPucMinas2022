import { RelacionamentoFornecedor } from './../classes/relacionamento-fornecedor.class';
import { EntityModel } from './entity.model';
import { ItemCompraVacina } from './item-compra-vacina.model';

export class CompraVacina extends EntityModel {
  fornecedor: RelacionamentoFornecedor;
  nota_fiscal: string;
  data_compra: Date;
  vl_total_compra: number;
  itens_compra: ItemCompraVacina[];
}
