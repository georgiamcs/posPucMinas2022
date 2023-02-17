import { EntityModel } from './../models/entity.model';

export class ListaComprasVacina extends EntityModel {
  nota_fiscal: string;
  data_compra: string;
  fornecedor_nome: string;
  itens: string;
  vl_total_compra: string;
}
