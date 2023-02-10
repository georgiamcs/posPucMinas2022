//TODO: Verificar css qnd nao escolhe idade e tipo idade pq esta quebrando
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { CrudComponent } from '../../../shared/components/crud/crud.component';
import { VacinaService } from './../../../services/vacina/vacina.service';
import { Vacina } from '../../../shared/models/vacina.model';
import { validadoresRequeridoSemEspacos } from 'src/app/shared/utils/util';

@Component({
  selector: 'vacine-crud-vacina',
  templateUrl: './crud-vacina.component.html',
  styleUrls: ['./crud-vacina.component.scss'],
})
export class CrudVacinaComponent
  extends CrudComponent<Vacina>
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
    this.nomeCampoFormIdentificaEntidade = 'tx_nome';
  }

  protected override buildForm() {
    this.form = this.formBuilder.group({
      _id: [null],
      tx_nome: [
        null,
        Validators.compose([
          validadoresRequeridoSemEspacos(),
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
      tx_protecao_contra: [null, validadoresRequeridoSemEspacos()],
      tx_composicao: [null, validadoresRequeridoSemEspacos()],
      in_idade_recomendada: [true, [Validators.required]],
      tp_idade_recomendada: [null],
      nr_idade_recomendada: [null],
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
    const temIdadeRecomendada = this.recuperarValorCampoForm('in_idade_recomendada');
    const controlTpIdade = this.form.get('tp_idade_recomendada');
    const controlNrIdade = this.form.get('nr_idade_recomendada');

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
