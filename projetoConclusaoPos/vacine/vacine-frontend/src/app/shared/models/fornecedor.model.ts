import { CrudModel } from './crud.model';

export class Fornecedor extends CrudModel {
  nome: string;
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
