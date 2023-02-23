import { RelacionamentoUsuario } from '../classes/relacionamento-usuario.class';
import { EntityNomeModel } from './entity-nome.model';
import { ItemVacinacao } from './item-vacinacao.model';

export class Vacinacao extends EntityNomeModel {
  codigo: string;
  usuario_cliente: RelacionamentoUsuario;
  usuario_aplicador_vacina: RelacionamentoUsuario;
  data_aplicacao: Date;
  vl_total: number;
  itens_vacinacao: ItemVacinacao[];
}
