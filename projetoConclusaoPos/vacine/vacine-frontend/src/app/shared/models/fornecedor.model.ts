import { EntityNomeModel } from './entity-nome.model';

export class Fornecedor extends EntityNomeModel {
  email: string;
  cnpj: string;
  endereco: {
    logradouro: string;
    numero: string;
    complemento?: string;
    cep: string;
  };
  tel_celular?: string;
  tel_fixo?: string;
}
