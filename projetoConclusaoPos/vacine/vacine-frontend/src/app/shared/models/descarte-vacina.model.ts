import { RelacionamentoUsuario } from '../classes/relacionamento-usuario.class';
import { EntityModel } from './entity.model';
import { ItemDescarteVacina } from './item-descarte.model';

export class DescarteVacina extends EntityModel {
  codigo: string;
  usuario_resp_descarte: RelacionamentoUsuario;
  data_descarte: Date;
  local_descarte: string;
  itens_descarte: ItemDescarteVacina[];
}
