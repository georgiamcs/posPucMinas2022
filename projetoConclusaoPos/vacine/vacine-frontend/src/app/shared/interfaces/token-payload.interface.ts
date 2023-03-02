import { Usuario } from '../classes/usuario.class';

export interface TokenPayload {
  usuario: Usuario;
  token: string;
}
