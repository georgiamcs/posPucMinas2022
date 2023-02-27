import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

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
    protected override changeDetectorRef: ChangeDetectorRef,
    protected override media: MediaMatcher,
    protected override router: Router,
    protected override formBuilder: FormBuilder,
    protected override activatedRoute: ActivatedRoute,
    protected override dialogoConf: MatDialog,
    protected override service: VacinaService
  ) {
    super(
      changeDetectorRef,
      media,
      router,
      activatedRoute,
      formBuilder,
      dialogoConf,
      service
    );
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  protected definirIdentificadoresEntidade() {
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
      justificativa_alt_estoque: [null, null],
    });
  }

  protected exibirJustEstoque() {
    const exibir =
      this.modoFormulario === ModoFormulario.ALTERACAO &&
      this.registro?.qtd_doses_estoque !=
        this.getValorCampoForm(this.form, 'qtd_doses_estoque');

    const ctrlJust = this.getFormControl(
      this.form,
      'justificativa_alt_estoque'
    );

    if (exibir) {
      ctrlJust.setValidators(
        ValidatorsUtil.getValidadorObrigatorioSemEspacos()
      );
    } else {
      ctrlJust.setValidators(null);
      ctrlJust.setValue(null);
    }

    return exibir;
  }
}
