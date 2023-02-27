import { EntityModel } from '../models/entity.model';

export class ListaDescarteVacinas extends EntityModel {
  codigo: string | undefined | null;
  data_descarte: Date | undefined | null;
  resp_descarte: string | undefined | null;
  motivo_descarte: string | undefined | null;
  local_descarte: string | undefined | null;
  vacinas: string | undefined | null;
}
