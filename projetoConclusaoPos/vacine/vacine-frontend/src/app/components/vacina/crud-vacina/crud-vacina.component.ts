import { VacinaService } from './../../../services/vacina/vacina.service';
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
import { Router } from '@angular/router';

@Component({
  selector: 'app-crud-vacina',
  templateUrl: './crud-vacina.component.html',
  styleUrls: ['./crud-vacina.component.scss'],
})
export class CrudVacinaComponent {
  vacina: Vacina;

  modoFormulario: ModoFormulario = ModoFormulario.INICIAL;
  tiposIdadeRecomendada: DominioCodigoRotulo[];

  constructor(private vacinaService: VacinaService, private router: Router) {
    this.vacina = new Vacina();

    this.tiposIdadeRecomendada = mapearDominio(DominioIdadeRecomendada);
  }

  salvar() {
    this.vacinaService
      .incluir(this.vacina)
      .subscribe(() => this.router.navigate(['/listar-vacina']));
  }

  cancelar() {
    this.router.navigate(['/listar-vacina']);
  }
}
