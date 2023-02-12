import { Tema } from './tema.enum';
import { ListaSelect } from '../interfaces/lista-select.interface';

export enum TipoPerfil {
  ADMINISTRADOR = 'ADMIN',
  CLIENTE = 'CLIENTE',
  CADASTRADOR_COMPRA = 'CAD-COMPRA',
  CADASTRADOR_FORNECEDOR = 'CAD-FORNECEDOR',
  CADASTRADOR_USUARIO = 'CAD-USUARIO',
  CADASTRADOR_VACINA = 'CAD-VACINA',
  CADASTRADOR_VACINACAO = 'CAD-VACINACAO',
}

export const LISTA_PERFIS: ListaSelect[] = [
  { valor: TipoPerfil.ADMINISTRADOR, valorExibicao: 'Administrador' },
  {
    valor: TipoPerfil.CADASTRADOR_COMPRA,
    valorExibicao: 'Cadastrador de Compras',
  },
  {
    valor: TipoPerfil.CADASTRADOR_FORNECEDOR,
    valorExibicao: 'Cadastrador de Fornecedores',
  },
  {
    valor: TipoPerfil.CADASTRADOR_USUARIO,
    valorExibicao: 'Cadastrador de Usuários',
  },
  {
    valor: TipoPerfil.CADASTRADOR_VACINA,
    valorExibicao: 'Cadastrador de Vacinas',
  },
  {
    valor: TipoPerfil.CADASTRADOR_VACINACAO,
    valorExibicao: 'Cadastrador de Vacinação',
  },
  { valor: TipoPerfil.CLIENTE, valorExibicao: 'Cliente' },
];


export function getListaPerfilPorTema(tema: Tema) {

  switch (tema) {
    case Tema.COMPRA:
      return [TipoPerfil.ADMINISTRADOR, TipoPerfil.CADASTRADOR_COMPRA];

    case Tema.FORNECEDOR:
      return [TipoPerfil.ADMINISTRADOR, TipoPerfil.CADASTRADOR_FORNECEDOR];

    case Tema.VACINA:
      return [TipoPerfil.ADMINISTRADOR, TipoPerfil.CADASTRADOR_VACINA];

    case Tema.VACINACAO:
      return [TipoPerfil.ADMINISTRADOR, TipoPerfil.CADASTRADOR_VACINACAO];

    case Tema.USUARIO:
      return [TipoPerfil.ADMINISTRADOR, TipoPerfil.CADASTRADOR_USUARIO];

    default:
      return [];
  }
}
