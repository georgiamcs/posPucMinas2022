import { Component, Input } from '@angular/core';

import {
  DominioIdadeRecomendada,
  Vacina,
} from '../../../shared/models/vacina.model';
import { ModoFormulario } from 'src/app/shared/enums/modo-formulario-enum';
import {
  mapearDominio,
  DominioCodigoRotulo,
} from 'src/app/shared/models/dominio-codigo-rotulo.model';

@Component({
  selector: 'app-crud-vacina',
  templateUrl: './crud-vacina.component.html',
  styleUrls: ['./crud-vacina.component.scss'],
})
export class CrudVacinaComponent {
  @Input() vacina: Vacina;

  modoFormulario: ModoFormulario = ModoFormulario.INICIAL;
  tiposIdadeRecomendada: DominioCodigoRotulo[];

  constructor() {
    this.vacina = new Vacina();

    // this.vacina.nome = 'Novissima vacina';
    // this.vacina.protecaoContra = 'Proteção contra da vacina';
    // this.vacina.composicao = 'Composição da vacina';
    // this.vacina.temIdadeRecomendada = false;
    // this.vacina.tipoIdadeRecomendada = 'A';
    // this.vacina.vlIdadeRecomemendada = 2;

    this.tiposIdadeRecomendada = mapearDominio(DominioIdadeRecomendada);
  }

  salvar() {
    alert('salvo com sucesso!');
  }
}
