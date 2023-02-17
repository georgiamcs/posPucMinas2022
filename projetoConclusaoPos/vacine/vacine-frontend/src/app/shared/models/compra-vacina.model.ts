import { EntityNomeModel } from "./entity-nome.model";
import { ItemCompraVacina } from "./item-compra-vacina.model";

export class CompraVacina extends EntityNomeModel {
  fornecedor_id: string;
  fornecedor_nome: string;
  fornecedor_cnpj: string;
  nota_fiscal: string;
  data_compra: Date;
  vl_total_compra: number;
  itens_compra: ItemCompraVacina[];
}
