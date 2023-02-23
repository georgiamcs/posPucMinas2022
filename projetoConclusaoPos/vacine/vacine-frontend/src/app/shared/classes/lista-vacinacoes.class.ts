import { EntityModel } from './../models/entity.model';

export class ListaVacinacoes extends EntityModel {
  codigo: string | undefined | null;
  data_aplicacao: string | undefined | null;
  cliente: string | undefined | null;
  aplicador_vacina: string | undefined | null;
  vacinas: string | undefined | null;
  vl_total: string | undefined | null;
}
