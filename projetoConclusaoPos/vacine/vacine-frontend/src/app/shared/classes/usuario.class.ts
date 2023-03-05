import { TipoPerfil } from './acesso.class';
import { ItemAutorizacaoUsuario } from './../models/item-autorizacao-usuario.model';
import { TipoUsuario } from '../enums/tipo-usuario.enum';
import { EntityNomeModel } from '../models/entity-nome.model';

export class Usuario extends EntityNomeModel {
  tipo: TipoUsuario;
  email: string;
  cpf?: string;
  data_nascimento?: Date;
  endereco?: {
    logradouro?: string;
    numero?: string;
    complemento?: string;
    cidade?: string;
    estado?: string;
    cep?: string;
  };
  tel_celular?: string;
  tel_fixo?: string;
  senha?: string;
  perfil_acesso?: TipoPerfil;
  autorizacoes?: ItemAutorizacaoUsuario[];
}
