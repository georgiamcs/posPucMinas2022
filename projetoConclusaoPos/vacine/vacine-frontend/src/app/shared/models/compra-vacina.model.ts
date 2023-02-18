import { RelacionamentoFornecedor } from './../classes/relacionamento-fornecedor.class';
import { EntityNomeModel } from "./entity-nome.model";
import { ItemCompraVacina } from "./item-compra-vacina.model";

export class CompraVacina extends EntityNomeModel {
  fornecedor: RelacionamentoFornecedor
  nota_fiscal: string;
  data_compra: Date;
  vl_total_compra: number;
  itens_compra: ItemCompraVacina[];
}
