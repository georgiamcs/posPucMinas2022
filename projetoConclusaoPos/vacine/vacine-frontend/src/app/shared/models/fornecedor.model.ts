import { EntityModel } from './entity.model';

export class Fornecedor extends EntityModel {
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
