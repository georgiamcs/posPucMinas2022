import { Fornecedor } from './../models/fornecedor.model';
export class RelacionamentoFornecedor {
  _id: string | undefined | null;
  nome: string | undefined | null;
  cnpj: string | undefined | null;

  static fornecedorToRelacionamentoFornecedor(
    f: Fornecedor
  ): RelacionamentoFornecedor {
    let novo = new RelacionamentoFornecedor();

    novo._id = f._id;
    novo.nome = f.nome;
    novo.cnpj = new Date(f.cnpj).toLocaleDateString('pt-BR');

    return novo;
  }
}
