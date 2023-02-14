import { TipoPerfil } from '../classes/acesso.class';
import { TipoUsuario } from './../enums/tipo-usuario.enum';
import { EntityModel } from './entity.model';

export class Usuario extends EntityModel {
  tipo: TipoUsuario;
  nome: string;
  email: string;
  cpf?: string;
  endereco?: {
    logradouro?: string;
    numero?: string;
    complemento?: string;
    cep?: string;
  };
  tel_celular?: string;
  tel_fixo?: string;
  senha: string;
  perfis: TipoPerfil[];
}
