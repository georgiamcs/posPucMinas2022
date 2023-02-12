import { TipoPerfil } from '../classes/acesso.class';
import { TipoUsuario } from './../enums/tipo-usuario.enum';
import { CrudModel } from './crud.model';

export class Usuario extends CrudModel {
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
