//TODO: Verificar css qnd nao escolhe idade e tipo idade pq esta quebrando
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import { GenericCrudComponent } from 'src/app/components/generic-crud/generic-crud.component';
import { Util } from 'src/app/shared/utils/util.util';
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
    private _service: VacinaService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _dialogoConf: MatDialog
  ) {
    super();

    this.definirAtributosInjetores();
    this.definirIdentificadoresEntidade();
    this.preencherAtributosGenericosCrud();
  }

  private definirAtributosInjetores() {
    this.service = this._service;
    this.formBuilder = this._formBuilder;
    this.router = this._router;
    this.activatedRoute = this._activatedRoute;
    this.dialogoConf = this._dialogoConf;
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
          Util.getValidadorObrigatorioSemEspacos(),
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
      protecao_contra: [null, Util.getValidadorObrigatorioSemEspacos()],
      composicao: [null, Util.getValidadorObrigatorioSemEspacos()],
      in_idade_recomendada: [true, [Validators.required]],
      tp_idade_recomendada: [null],
      nr_idade_recomendada: [null],
      estoque: [
        0,
        Validators.compose([
          Util.getValidadorObrigatorioSemEspacos(),
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

  public verificarIdadeRecomendada() {
    const temIdadeRecomendada = this.getValorCampoForm('in_idade_recomendada');
    const controlTpIdade = this.getFormControl('tp_idade_recomendada');
    const controlNrIdade = this.getFormControl('nr_idade_recomendada');

    if (!temIdadeRecomendada || temIdadeRecomendada == undefined) {
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
