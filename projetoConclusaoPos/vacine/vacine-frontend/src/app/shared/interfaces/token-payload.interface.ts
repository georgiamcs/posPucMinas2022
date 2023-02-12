import { Usuario } from '../models/usuario.model';

export interface TokenPayload {
  usuario: Usuario;
  token: string;
}
