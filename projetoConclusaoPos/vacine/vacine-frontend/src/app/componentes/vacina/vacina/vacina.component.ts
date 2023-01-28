import { MatInputModule } from '@angular/material/input';

import { Vacina } from './../../../shared/models/vacina.model';
import { DominioCodigoRotulo } from './../../../shared/models/dominio-codigo-rotulo.model';
import { Component } from '@angular/core';
import { ModoFormulario } from 'src/app/shared/enums/modo-formulario-enum';

@Component({
  selector: 'app-vacina',
  templateUrl: './vacina.component.html',
  styleUrls: ['./vacina.component.css'],
})
export class VacinaComponent {
  modoFormulario: ModoFormulario = ModoFormulario.INICIAL;
  tipoIdadeRecomendada: DominioCodigoRotulo;
  vacina: Vacina;
  vacinas: Vacina[];
}
