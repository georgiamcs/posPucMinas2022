import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { GenericCrudMestreDetalheComponent } from 'src/app/components/generic-crud-mestre-detalhe/generic-crud-mestre-detalhe.component';
import { VacinaService } from 'src/app/services/crud/vacina/vacina.service';
import { DefinicaoColunasExibidas } from 'src/app/shared/interfaces/defincao-colunas-exibidas.interface';
import { ValidatorsUtil } from 'src/app/shared/utils/validators-util.util';
import { FornecedorService } from '../../../services/crud/fornecedor/fornecedor.service';
import { RelacionamentoFornecedor } from '../../../shared/classes/relacionamento-fornecedor.class';
import { RelacionamentoVacina } from '../../../shared/classes/relacionamento-vacina.class';
import { CompraVacinaService } from './../../../services/crud/compra-vacina/compra-vacina.service';
import { CompraVacina } from './../../../shared/models/compra-vacina.model';
import { ItemCompraVacina } from './../../../shared/models/item-compra-vacina.model';

@Component({
  selector: 'vacine-crud-compra-vacina',
  templateUrl: './crud-compra-vacina.component.html',
  styleUrls: ['./crud-compra-vacina.component.scss'],
})
export class CrudCompraVacinaComponent extends GenericCrudMestreDetalheComponent<
  CompraVacina,
  ItemCompraVacina
> {
  protected readonly nomeCtrlFornecedor = 'fornecedor';
  protected readonly nomeCtrlVacina = 'vacina';

  protected readonly nomeAtributoExibirFornecedor = 'nome';
  protected readonly nomeAtributoExibirVacina = 'nome';

  protected fornecedores: RelacionamentoFornecedor[] = [];
  protected fornecedoresFiltrados!: Observable<RelacionamentoFornecedor[]>;

  protected vacinas: RelacionamentoVacina[] = [];
  protected vacinasFiltradas!: Observable<RelacionamentoVacina[]>;

  constructor(
    protected override changeDetectorRef: ChangeDetectorRef,
    protected override media: MediaMatcher,
    protected override router: Router,
    protected override formBuilder: FormBuilder,
    protected override activatedRoute: ActivatedRoute,
    protected override dialogoConf: MatDialog,
    protected override service: CompraVacinaService,
    private serviceVacina: VacinaService,
    private serviceFornecedor: FornecedorService
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

  protected getDefColDetalheExibidas(): DefinicaoColunasExibidas[] {
    return [
      { def: 'vacina' },
      {
        def: 'lote',
        showMobileResolution: false,
        showTabletLowResolution: false,
      },
      {
        def: 'qtd_frascos',
        showMobileResolution: false,
        showTabletLowResolution: false,
      },
      { def: 'qtd_doses' },
      {
        def: 'data_validade',
        showMobileResolution: false,
        showTabletLowResolution: false,
      },
      { def: 'vl_total_item_compra', showMobileResolution: false },
      { def: 'acoes' },
    ];
  }

  protected override preencherFormComRegistroId(registro: any): void {
    super.preencherFormComRegistroId(registro);
    this.itens = registro.itens_compra;
  }

  protected definirIdentificadoresEntidade() {
    this.nomeEntidade = 'compra';
    this.pluralEntidade = 'compras-vacina';
    this.artigoEntidade = 'a';
    this.nomeCampoFormIdentificaEntidade = 'nota_fiscal';
  }

  protected buildFormDetalhe() {
    this.formItem = this.formBuilder.group({
      vacina: [
        null,
        Validators.compose([
          ValidatorsUtil.getValidadorObrigatorioSemEspacos(),
          ValidatorsUtil.getValidatorValorExisteInpuAutoComplete(),
        ]),
      ],
      lote: [null, ValidatorsUtil.getValidadorObrigatorioSemEspacos()],
      qtd_frascos: [
        null,
        Validators.compose([
          ValidatorsUtil.getValidadorObrigatorioSemEspacos(),
          Validators.pattern('^[0-9]*$'),
          Validators.min(1),
        ]),
      ],
      qtd_doses: [
        null,
        Validators.compose([
          ValidatorsUtil.getValidadorObrigatorioSemEspacos(),
          Validators.pattern('^[0-9]*$'),
          Validators.min(0),
        ]),
      ],
      data_validade: [null, ValidatorsUtil.getValidadorObrigatorioSemEspacos()],
      vl_total_item_compra: [
        null,
        ValidatorsUtil.getValidadorObrigatorioSemEspacos(),
      ],
    });
    this.setLookupVacina();
  }

  protected buildFormMestre() {
    this.form = this.formBuilder.group({
      _id: [null],
      nota_fiscal: [null, ValidatorsUtil.getValidadorObrigatorioSemEspacos()],
      data_compra: [null, ValidatorsUtil.getValidadorObrigatorioSemEspacos()],
      fornecedor: [
        null,
        Validators.compose([
          ValidatorsUtil.getValidadorObrigatorioSemEspacos(),
          ValidatorsUtil.getValidatorValorExisteInpuAutoComplete(),
        ]),
      ],
    });
    this.setLookupFornecedor();
    this.itens = [];
  }

  private setLookupFornecedor() {
    this.subscription = this.serviceFornecedor
      .getAllConverted<RelacionamentoFornecedor>(
        RelacionamentoFornecedor.fornecedorToRelacionamentoFornecedor
      )
      .subscribe({
        next: (listaFornecedor) => {
          this.fornecedores = listaFornecedor;
          this.ordenarLookup(this.fornecedores);
          this.setChangeFornecedorParaFiltrarValores();
        },
        error: (e) => {
          this.tratarErroCarregarLookup(e, this.nomeCtrlFornecedor);
        },
      });
  }

  private setLookupVacina() {
    this.subscription = this.serviceVacina
      .getAllConverted<RelacionamentoVacina>(
        RelacionamentoVacina.vacinaToRelacionamentoVacina
      )
      .subscribe({
        next: (listaVacina) => {
          this.vacinas = listaVacina;
          this.ordenarLookup(this.vacinas);
          this.setChangeVacinaParaFiltrarValores();
        },
        error: (e) => {
          this.tratarErroCarregarLookup(e, this.nomeCtrlVacina);
        },
      });
  }

  private setChangeFornecedorParaFiltrarValores() {
    this.fornecedoresFiltrados = this.getFormControl(this.form,
      this.nomeCtrlFornecedor
    ).valueChanges.pipe(
      startWith(''),
      map((value) =>
        this.filtrarPeloValorAtributo(this.form,
          this.fornecedores,
          value,
          this.nomeCtrlFornecedor,
          this.nomeAtributoExibirFornecedor
        )
      )
    );
  }

  protected filtrarFornecedor(value: any) {
    this.filtrarPeloValorAtributo(
      this.form,
      this.fornecedores,
      value,
      this.nomeCtrlFornecedor,
      this.nomeAtributoExibirFornecedor
    );
  }

  private setChangeVacinaParaFiltrarValores() {
    this.vacinasFiltradas = this.getFormControl(
      this.formItem,
      this.nomeCtrlVacina
    ).valueChanges.pipe(
      startWith(''),
      map((value) =>
        this.filtrarPeloValorAtributo(
          this.formItem,
          this.vacinas,
          value,
          this.nomeCtrlVacina,
          this.nomeAtributoExibirVacina
        )
      )
    );
  }

  protected getItemDetalheForm(): ItemCompraVacina {
    const item: ItemCompraVacina = {
      vacina: this.getValorCampoForm(this.formItem, 'vacina'),
      lote: this.getValorCampoForm(this.formItem, 'lote'),
      qtd_frascos: this.getValorCampoForm(this.formItem, 'qtd_frascos'),
      qtd_doses: this.getValorCampoForm(this.formItem, 'qtd_doses'),
      data_validade: this.getValorCampoForm(this.formItem, 'data_validade'),
      vl_total_item_compra: this.getValorCampoForm(
        this.formItem,
        'vl_total_item_compra'
      ),
    };

    return item;
  }

  protected override getRegistroForm(): CompraVacina {
    let compraVacina: CompraVacina = new CompraVacina();
    compraVacina._id = this.getValorCampoForm(this.form, '_id');
    compraVacina.nota_fiscal = this.getValorCampoForm(this.form, 'nota_fiscal');
    compraVacina.data_compra = this.getValorCampoForm(this.form, 'data_compra');
    compraVacina.fornecedor = this.getValorCampoForm(this.form, 'fornecedor');
    compraVacina.vl_total_compra = this.calcularTotalCompra();
    compraVacina.itens_compra = this.itens;

    return compraVacina;
  }

  protected calcularTotalCompra(): number {
    const vlTotCompra = this.itens
      .map((i) => i.vl_total_item_compra)
      .reduce((acum, v) => acum + v, 0);

    return vlTotCompra;
  }

  protected getTextFooterTotal() {
    if (!this.isMobileResolution()) {
      return 'Total';
    } else {
      return '';
    }
  }
}
