import { EntityModel } from './../models/entity.model';

export class ListaComprasVacina extends EntityModel {
  nota_fiscal: string | undefined | null;
  data_compra: Date | undefined | null;
  fornecedor_nome: string | undefined | null;
  itens: string | undefined | null;
  vl_total_compra: string | undefined | null;
}
