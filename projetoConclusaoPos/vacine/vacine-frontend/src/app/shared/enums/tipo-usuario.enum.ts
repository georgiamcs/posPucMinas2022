import { ListaSelectComItens } from '../interfaces/lista-select-com-itens.interface';
import { TipoPerfil } from './tipo-perfil.enum';

export enum TipoUsuario {
  ADMINISTRADOR = 'A',
  ANALISTA_COMPRAS = 'L',
  CLIENTE = 'C',
  SECRETARIA = 'S',
  TECNICO_ENFERMAGEM = 'T',
}

export const LISTA_TIPOS_USUARIOS: ListaSelectComItens[] = [
  {
    valor: TipoUsuario.ADMINISTRADOR,
    valorExibicao: 'Administrador',
    itens: [TipoPerfil.ADMINISTRADOR],
  },
  {
    valor: TipoUsuario.ANALISTA_COMPRAS,
    valorExibicao: 'Analista de Compras',
    itens: [
      TipoPerfil.CADASTRADOR_COMPRA,
      TipoPerfil.CADASTRADOR_FORNECEDOR,
      TipoPerfil.CADASTRADOR_VACINA,
    ],
  },
  {
    valor: TipoUsuario.CLIENTE,
    valorExibicao: 'Cliente',
    itens: [TipoPerfil.CLIENTE],
  },
  {
    valor: TipoUsuario.TECNICO_ENFERMAGEM,
    valorExibicao: 'Técnico de Enfermagem',
    itens: [
      TipoPerfil.CADASTRADOR_VACINACAO,
      TipoPerfil.CADASTRADOR_USUARIO,
      TipoPerfil.CADASTRADOR_VACINA,
    ],
  },
  {
    valor: TipoUsuario.SECRETARIA,
    valorExibicao: 'Secretária',
    itens: [TipoPerfil.CADASTRADOR_VACINACAO, TipoPerfil.CADASTRADOR_USUARIO],
  },
];
