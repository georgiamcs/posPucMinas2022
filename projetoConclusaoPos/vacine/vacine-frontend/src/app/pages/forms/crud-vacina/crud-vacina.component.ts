import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';

import { GenericCrudComponent } from 'src/app/components/generic-crud/generic-crud.component';
import { ModoFormulario } from 'src/app/shared/enums/modo-formulario.enum';
import { ValidatorsUtil } from 'src/app/shared/utils/validators-util.util';
import { VacinaService } from '../../../services/crud/vacina/vacina.service';
import { Vacina } from '../../../shared/models/vacina.model';

@Component({
  selector: 'vacine-crud-vacina',
  templateUrl: './crud-vacina.component.html',
  styleUrls: ['./crud-vacina.component.scss'],
})
export class CrudVacinaComponent
  extends GenericCrudComponent<Vacina>
  implements OnInit
{
  constructor(
    private __router: Router,
    private __deviceService: DeviceDetectorService,
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _dialogoConf: MatDialog,
    private _service: VacinaService
  ) {
    super(
      __router,
      __deviceService,
      _activatedRoute,
      _formBuilder,
      _dialogoConf,
      _service
    );

    this.definirIdentificadoresEntidade();
    this.preencherAtributosGenericosCrud();
  }

  private definirIdentificadoresEntidade() {
    this.nomeEntidade = 'vacina';
    this.pluralEntidade = 'vacinas';
    this.artigoEntidade = 'a';
    this.nomeCampoFormIdentificaEntidade = 'nome';
  }

  protected override buildForm() {
    this.form = this.formBuilder.group({
      _id: [null],
      nome: [
        null,
        Validators.compose([
          ValidatorsUtil.getValidadorObrigatorioSemEspacos(),
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
      protecao_contra: [
        null,
        ValidatorsUtil.getValidadorObrigatorioSemEspacos(),
      ],
      composicao: [null, ValidatorsUtil.getValidadorObrigatorioSemEspacos()],
      vl_atual_unit_dose: [
        null,
        ValidatorsUtil.getValidadorObrigatorioSemEspacos(),
      ],
      qtd_doses_estoque: [
        null,
        Validators.compose([
          ValidatorsUtil.getValidadorObrigatorioSemEspacos(),
          Validators.pattern('^[0-9]*$'),
          Validators.min(0),
        ]),
      ],
    });
  }

  protected habilitarEstoque() {
      return this.modoFormulario === ModoFormulario.INCLUSAO;
  }
}
