import { Component } from '@angular/core';

import {
  DominioIdadeRecomendada,
  Vacina,
} from './../../shared/models/vacina.model';
import { ModoFormulario } from 'src/app/shared/enums/modo-formulario-enum';
import {
  mapearDominio,
  DominioCodigoRotulo,
} from 'src/app/shared/models/dominio-codigo-rotulo.model';

@Component({
  selector: 'app-vacina',
  templateUrl: './vacina.component.html',
  styleUrls: ['./vacina.component.scss'],
})
export class VacinaComponent {
  modoFormulario: ModoFormulario = ModoFormulario.INICIAL;
  tiposIdadeRecomendada: DominioCodigoRotulo[];
  vacina: Vacina;
  vacinas: Vacina[];

  constructor() {
    this.vacina = new Vacina();

    this.vacina.nome = 'Novissima vacina';
    this.vacina.protecaoContra = 'Proteção contra da vacina';
    this.vacina.composicao = 'Composição da vacina';
    this.vacina.temIdadeRecomendada = false;
    this.vacina.tipoIdadeRecomendada = 'A';
    this.vacina.vlIdadeRecomemendada = 2;

    this.tiposIdadeRecomendada = mapearDominio(DominioIdadeRecomendada);
    console.log('tipos idades recomendadas', this.tiposIdadeRecomendada);
  }

  salvar() {
    alert('salvo com sucesso!');
  }

  cancelar() {
    alert('cancelado com sucesso!');
  }
}
