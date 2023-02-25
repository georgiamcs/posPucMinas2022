import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { GenericCrudService } from 'src/app/services/generic/generic-crud/generic-crud.service';
import { ModoFormulario } from 'src/app/shared/enums/modo-formulario.enum';
import { EntityModel } from 'src/app/shared/models/entity.model';
import { GenericCrudComLookupComponent } from '../generic-crud-com-lookup/generic-crud-com-lookup.component';

@Component({
  selector: 'vacine-generic-crud-mestre-detalhe',
  templateUrl: './generic-crud-mestre-detalhe.component.html',
  styleUrls: ['./generic-crud-mestre-detalhe.component.scss'],
})
export abstract class GenericCrudMestreDetalheComponent<
  T extends EntityModel,
  I
> extends GenericCrudComLookupComponent<T> {
  protected formItem: FormGroup;
  protected itens: I[] = [];
  protected defColunasExibidas: string[];

  protected adicionando = false;

  constructor(
    private __router: Router,
    private __deviceService: DeviceDetectorService,
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _dialogoConf: MatDialog,
    private _service: GenericCrudService<T>
  ) {
    super(
      __router,
      __deviceService,
      _activatedRoute,
      _formBuilder,
      _dialogoConf,
      _service
    );
    this.definirColItensExibidas();
  }

  protected override habilitarBotaoAcao(): boolean {
    return (this.form.valid && this.itens.length > 0) || this.modoFormulario == ModoFormulario.EXCLUSAO;
  }

  protected abstract definirColItensExibidas(): void;

  protected abstract buildFormMestre(): void;

  protected abstract buildFormDetalhe(): void;

  protected abstract getItemDetalheForm(): I;

  protected abstract override getRegistroForm(): T;

  protected override preencherFormComRegistroId(registro: T): void {
    super.preencherFormComRegistroId(registro);
  }

  protected override buildForm() {
    this.buildFormMestre();
    this.buildFormDetalhe();
  }

  protected adicionarItemDetalhe() {
    const novoItem = this.getItemDetalheForm();
    this.itens.push(novoItem);
    this.atualizarListaItensDetalhe();
    this.limparFormDetalhe();
  }

  protected limparFormDetalhe() {
    this.formItem.reset();
  }

  protected setAdicionando(v: boolean) {
    this.adicionando = v;
  }

  protected fecharAdicionarItemDetalhe() {
    this.setAdicionando(false);
    this.limparFormDetalhe();
  }

  protected excluirItemDetalhe(registro: I) {
    this.itens.splice(this.itens.indexOf(registro), 1);
    this.atualizarListaItensDetalhe();
  }

  protected atualizarListaItensDetalhe() {
    this.itens = [...this.itens];
  }

  protected override limparFormulario(): void {
    super.limparFormulario();
    this.limparFormDetalhe();
    this.itens = [];
  }
}
