import { UsuarioAutenticado } from './../classes/usuario-autenticado.class';

export interface TokenPayload {
  usuario: UsuarioAutenticado;
  token: string;
}
