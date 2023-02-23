import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { map, Observable, startWith } from 'rxjs';
import { GenericCrudComLookupComponent } from 'src/app/components/generic-crud-com-lookup/generic-crud-com-lookup.component';
import { VacinaService } from 'src/app/services/crud/vacina/vacina.service';
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
export class CrudCompraVacinaComponent
  extends GenericCrudComLookupComponent<CompraVacina>
  implements OnInit
{
  protected readonly nomeCtrlFornecedor = 'fornecedor';
  protected readonly nomeCtrlVacina = 'vacina';

  protected readonly nomeAtributoExibirFornecedor = 'nome';
  protected readonly nomeAtributoExibirVacina = 'nome';

  protected formItem: FormGroup;

  protected fornecedores: RelacionamentoFornecedor[] = [];
  protected fornecedoresFiltrados!: Observable<RelacionamentoFornecedor[]>;

  protected vacinas: RelacionamentoVacina[] = [];
  protected vacinasFiltradas!: Observable<RelacionamentoVacina[]>;

  protected itens: ItemCompraVacina[] = [];

  protected adicionando = false;

  protected defColunasExibidas = [
    'vacina',
    'lote',
    'qtd_frascos',
    'qtd_doses',
    'data_validade',
    'vl_total_item_compra',
    'acoes',
  ];

  constructor(
    private __router: Router,
    private __deviceService: DeviceDetectorService,
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _dialogoConf: MatDialog,
    private _service: CompraVacinaService,
    private serviceVacina: VacinaService,
    private serviceFornecedor: FornecedorService
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
  override ngOnInit(): void {
    super.ngOnInit();
  }

  protected override preencherFormComRegistroId(registro: any): void {
    super.preencherFormComRegistroId(registro);
    this.itens = registro.itens_compra;
  }

  private definirIdentificadoresEntidade() {
    this.nomeEntidade = 'compra';
    this.pluralEntidade = 'compras-vacina';
    this.artigoEntidade = 'a';
    this.nomeCampoFormIdentificaEntidade = 'nota_fiscal';
  }

  protected override buildForm() {
    this.buildFormCompra();
    this.buildFormItens();
  }

  private buildFormItens() {
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
          Validators.min(0),
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

  private buildFormCompra() {
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
          this.setChangeVacinaParaFiltrarValores();
        },
        error: (e) => {
          this.tratarErroCarregarLookup(e, this.nomeCtrlVacina);
        },
      });
  }

  private setChangeFornecedorParaFiltrarValores() {
    this.fornecedoresFiltrados = this.getFormControl(
      this.nomeCtrlFornecedor
    ).valueChanges.pipe(
      startWith(''),
      map((value) =>
        this.filtrarPeloValorAtributo(
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
      this.fornecedores,
      value,
      this.nomeCtrlFornecedor,
      this.nomeAtributoExibirFornecedor
    );
  }

  private setChangeVacinaParaFiltrarValores() {
    this.vacinasFiltradas = this.getFormControl(
      this.nomeCtrlVacina,
      this.formItem
    ).valueChanges.pipe(
      startWith(''),
      map((value) =>
        this.filtrarPeloValorAtributo(
          this.vacinas,
          value,
          this.nomeCtrlVacina,
          this.nomeAtributoExibirVacina
        )
      )
    );
  }

  protected exibirTextoLookup(v: any): string {
    if (v) {
      return v.nome ? v.nome : '';
    } else {
      return '';
    }
  }

  protected getItemCompraForm() {
    const item: ItemCompraVacina = {
      vacina: this.getValorCampoForm('vacina', this.formItem),
      lote: this.getValorCampoForm('lote', this.formItem),
      qtd_frascos: this.getValorCampoForm('qtd_frascos', this.formItem),
      qtd_doses: this.getValorCampoForm('qtd_doses', this.formItem),
      data_validade: this.getValorCampoForm('data_validade', this.formItem),
      vl_total_item_compra: this.getValorCampoForm(
        'vl_total_item_compra',
        this.formItem
      ),
    };

    return item;
  }

  protected override getRegistroForm() {
    let compraVacina: CompraVacina = new CompraVacina();
    compraVacina._id = this.getValorCampoForm('_id');
    compraVacina.nota_fiscal = this.getValorCampoForm('nota_fiscal');
    compraVacina.data_compra = this.getValorCampoForm('data_compra');
    compraVacina.fornecedor = this.getValorCampoForm('fornecedor');
    compraVacina.vl_total_compra = this.calcularTotalCompra();
    compraVacina.itens_compra = this.itens;

    return compraVacina;
  }

  protected adicionarItem() {
    const novoItem = this.getItemCompraForm();
    this.itens.push(novoItem);
    this.atualizarListaItens();
    this.limparFormItens();
  }

  protected limparFormItens() {
    this.formItem.reset();
  }

  protected setAdicionando(v: boolean) {
    this.adicionando = v;
  }

  protected fecharAdicionarItem() {
    this.setAdicionando(false);
    this.limparFormItens();
  }

  protected excluirItem(registro: ItemCompraVacina) {
    this.itens.splice(this.itens.indexOf(registro), 1);
    this.atualizarListaItens();
  }

  protected calcularTotalCompra(): number {
    const vlTotCompra = this.itens
      .map((i) => i.vl_total_item_compra)
      .reduce((acum, v) => acum + v, 0);

    return vlTotCompra;
  }

  protected atualizarListaItens() {
    this.itens = [...this.itens];
  }

  protected override limparFormulario(): void {
    super.limparFormulario();
    this.limparFormItens();
    this.itens = [];
  }
}
