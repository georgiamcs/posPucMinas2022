import { ListaSelect } from './lista-select.interface';

export interface ListaSelectComItens extends ListaSelect {
  valor: string;
  valorExibicao: string;
  itens?: string[];
}
