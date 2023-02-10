import { ListaSelect } from '../interfaces/lista-select.interface';

export enum TipoUsuario {
  ADMINISTRADOR = 'A',
  CLIENTE = 'C',
  SECRETARIA = 'S',
  TECNICO_ENFERMAGEM = 'T',
}

export const LISTA_TIPOS_USUARIOS: ListaSelect[] = [
  { valor: TipoUsuario.ADMINISTRADOR, valorExibicao: 'Administrador' },
  { valor: TipoUsuario.CLIENTE, valorExibicao: 'Cliente' },
  {
    valor: TipoUsuario.TECNICO_ENFERMAGEM,
    valorExibicao: 'Técnico de Enfermagem',
  },
  { valor: TipoUsuario.SECRETARIA, valorExibicao: 'Secretária' },
];
