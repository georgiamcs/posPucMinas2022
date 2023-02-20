//TODO: Verificar css qnd nao escolhe idade e tipo idade pq esta quebrando
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';

import { GenericCrudComponent } from 'src/app/components/generic-crud/generic-crud.component';
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
      in_idade_recomendada: [false, [Validators.required]],
      tp_idade_recomendada: [null],
      nr_idade_recomendada: [null],
      estoque: [
        null,
        Validators.compose([
          ValidatorsUtil.getValidadorObrigatorioSemEspacos(),
          Validators.min(0),
        ]),
      ],
    });
  }

  protected override preencherFormComRegistroId(registro: any): void {
    this.form.patchValue(registro);
    this.verificarIdadeRecomendada();
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.verificarIdadeRecomendada();
  }

  protected override limparFormulario(): void {
    super.limparFormulario();
    this.verificarIdadeRecomendada();
  }

  public verificarIdadeRecomendada() {
    let temIdadeRecomendada = this.getValorCampoForm('in_idade_recomendada');
    const controlInIdade = this.getFormControl('in_idade_recomendada');
    const controlTpIdade = this.getFormControl('tp_idade_recomendada');
    const controlNrIdade = this.getFormControl('nr_idade_recomendada');

    if (temIdadeRecomendada == undefined) {
      this.setValorCampoForm('in_idade_recomendada', false);
      temIdadeRecomendada = this.getValorCampoForm('in_idade_recomendada');
    }

    if (!temIdadeRecomendada) {
      controlTpIdade?.setValue(!temIdadeRecomendada ? null : false);
      controlNrIdade?.setValue(null);
      this.atualizarValidadores(controlTpIdade!, null);
      this.atualizarValidadores(controlNrIdade!, null);
      controlTpIdade?.setValidators(null);
      controlNrIdade?.setValidators(null);
    } else {
      controlTpIdade?.setValidators([Validators.required]);
      controlNrIdade?.setValidators(
        Validators.compose([
          Validators.required,
          Validators.min(0),
          Validators.max(130),
        ])
      );
    }
  }
}
