import { EntityNomeModel } from '../models/entity-nome.model';
import { ItemAutorizacaoUsuario } from './../models/item-autorizacao-usuario.model';
import { TipoPerfil } from './acesso.class';

export class UsuarioAutenticado extends EntityNomeModel {
  email: string;
  perfil_acesso: TipoPerfil;
  autorizacoes: ItemAutorizacaoUsuario[];
}
