import { RelacionamentoUsuario } from './../classes/relacionamento-usuario.class';
import { RelacionamentoVacina } from './../classes/relacionamento-vacina.class';
import { EntityModel } from './entity.model';

export class ControleEstoqueVacina extends EntityModel {
  vacina: RelacionamentoVacina;
  usuario: RelacionamentoUsuario;
  nota_fiscal: string;
  data_evento: Date;
  tipo_evento: string;
  tipo_motivo: string;
  descricao_evento: string;
  qtd_estoque_antes: number;
  qtd_estoque_depois: number;
}
