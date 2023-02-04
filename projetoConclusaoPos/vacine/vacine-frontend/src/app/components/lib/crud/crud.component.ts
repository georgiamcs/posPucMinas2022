import { Component } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  definirLabelBotaoAcaoModoFormulario,
  definirLabelBotaoFecharModoFormulario,
  definirModoFormulario,
  ModoFormulario,
} from 'src/app/shared/enums/modo-formulario-enum';
import { CrudModel } from 'src/app/shared/models/crud.model';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss'],
})
export class CrudComponent<Type extends CrudModel> {
  protected ROTULO_BOTAO_ACEITAR = 'Sim';
  protected ROTULO_BOTAO_REJEITAR = 'Não';

  protected form: FormGroup;
  protected modoFormulario: ModoFormulario = ModoFormulario.INCLUSAO;
  protected lbBotaoSalvar: string | null;
  protected lbBotaoFechar: string | null;

  protected id: string | null;
  protected registro: Type;

  constructor() {}

  protected preencherAtributosGenericosCrud(
    router: Router,
    activatedRoute: ActivatedRoute
  ) {
    this.id = activatedRoute.snapshot.paramMap.get('id');
    this.modoFormulario = definirModoFormulario(this.id, router.url);
    this.lbBotaoSalvar = definirLabelBotaoAcaoModoFormulario(
      this.modoFormulario
    );
    this.lbBotaoFechar = definirLabelBotaoFecharModoFormulario(
      this.modoFormulario
    );
  }

  protected preencherFormComRegistroId(registro: any): void {
    this.form.patchValue(registro);
  }

  protected somenteLeitura(): boolean {
    return (
      this.modoFormulario == ModoFormulario.CONSULTA ||
      this.modoFormulario == ModoFormulario.EXCLUSAO
    );
  }

  protected temBotaoAcao(): boolean {
    return this.modoFormulario != ModoFormulario.CONSULTA;
  }

  protected atualizarValidadores(
    formControl: AbstractControl,
    validators: ValidatorFn | ValidatorFn[] | null
  ): void {
    formControl?.setValidators(validators);
    formControl?.updateValueAndValidity();
  }

  protected carregarListaRegistros(router: Router, caminhoRelativo: string) {
    router.navigate([caminhoRelativo]);
  }

  public doActionFechar(router: Router,caminhoRelativo: string) {
    router.navigate([caminhoRelativo]);
  }
}
