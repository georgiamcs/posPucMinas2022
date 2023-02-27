import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericCrudService } from 'src/app/services/generic/generic-crud/generic-crud.service';
import { ModoFormulario } from 'src/app/shared/enums/modo-formulario.enum';
import { DefinicaoColunasExibidas } from 'src/app/shared/interfaces/defincao-colunas-exibidas.interface';
import { EntityModel } from 'src/app/shared/models/entity.model';
import { Util } from 'src/app/shared/utils/util.util';
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

  protected abstract getDefColDetalheExibidas(): DefinicaoColunasExibidas[];

  constructor(
    protected override changeDetectorRef: ChangeDetectorRef,
    protected override media: MediaMatcher,
    protected override router: Router,
    protected override formBuilder: FormBuilder,
    protected override activatedRoute: ActivatedRoute,
    protected override dialogoConf: MatDialog,
    protected override service: GenericCrudService<T>
  ) {
    super(
      changeDetectorRef,
      media,
      router,
      formBuilder,
      activatedRoute,
      dialogoConf,
      service
    );
  }

  protected override habilitarBotaoAcao(): boolean {
    return (
      (this.form.valid && this.itens.length > 0) ||
      this.modoFormulario == ModoFormulario.EXCLUSAO
    );
  }

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

  protected getDisplayedColumnsMediaType(): string[] {
    let ret = this.getDefColDetalheExibidas()
      .filter((cd) => {
        const condMobile =
          Util.converterUndefinedEmTrue(cd.showMobileResolution) &&
          this.isMobileResolution();
        const condDesktop =
          Util.converterUndefinedEmTrue(cd.showDesktopResolution) &&
          this.isDesktopResolution();
        const condTabletLow =
          Util.converterUndefinedEmTrue(cd.showTabletLowResolution) &&
          this.isTabletLowResolution();
        const condTabletHigh =
          Util.converterUndefinedEmTrue(cd.showTabletHighResolution) &&
          this.isTabletHighResolution();

        const exibeColuna =
          condMobile || condDesktop || condTabletLow || condTabletHigh;
        return exibeColuna;
      })
      .map((cd) => cd.def);

    return ret;
  }
}
