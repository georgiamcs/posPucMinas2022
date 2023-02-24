import { Vacina } from "../models/vacina.model";

export class RelacionamentoVacina {
  _id: string | null | undefined;
  nome: string | null | undefined;
  protecao_contra: string | null | undefined;
  vl_atual_unit_dose: number | null | undefined;

  static vacinaToRelacionamentoVacina(v: Vacina): RelacionamentoVacina {
    let novo = new RelacionamentoVacina();

    novo._id = v._id;
    novo.nome = v.nome;
    novo.protecao_contra = v.protecao_contra;
    novo.vl_atual_unit_dose = v.vl_atual_unit_dose;

    return novo;
  }
}
