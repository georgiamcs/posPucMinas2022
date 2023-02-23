import { Usuario } from './../models/usuario.model';

export class RelacionamentoUsuario {
  _id: string | null | undefined;
  nome: string | null | undefined;
  cpf: string | null | undefined;

  static usuarioToRelacionamentoUsuario(v: Usuario): RelacionamentoUsuario {
    let novo = new RelacionamentoUsuario();

    novo._id = v._id;
    novo.nome = v.nome;
    novo.cpf = v.cpf;

    return novo;
  }
}
