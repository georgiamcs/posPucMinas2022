import { Usuario } from './usuario.class';

export class RelacionamentoUsuario {
  _id: string | null | undefined;
  nome: string;
  cpf: string | null | undefined;
  tipo: string | null | undefined;

  static usuarioToRelacionamentoUsuario(v: Usuario): RelacionamentoUsuario {
    let novo = new RelacionamentoUsuario();

    novo._id = v._id;
    novo.nome = v.nome;
    novo.cpf = v.cpf;
    novo.tipo = v.tipo;

    return novo;
  }
}
