import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { GenericCrudComLookupComponent } from 'src/app/components/generic-crud-com-lookup/generic-crud-com-lookup.component';
import { VacinaService } from 'src/app/services/crud/vacina/vacina.service';
import { Util } from 'src/app/shared/utils/util.util';
import { ValidatorsUtil } from 'src/app/shared/utils/validators-util.util';
import { FornecedorService } from '../../../services/crud/fornecedor/fornecedor.service';
import { RelacionamentoFornecedor } from '../../../shared/classes/relacionamento-fornecedor.class';
import { RelacionamentoVacina } from '../../../shared/classes/relacionamento-vacina.class';
import { CompraVacinaService } from './../../../services/crud/compra-vacina/compra-vacina.service';
import { CompraVacina } from './../../../shared/models/compra-vacina.model';

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
  protected readonly nomeCtrlVacinaCompleto = 'itens_compra.vacina';

  protected readonly nomeAtributoExibirFornecedor = 'nome';
  protected readonly nomeAtributoExibirVacina = 'nome';

  fornecedores: RelacionamentoFornecedor[] = [];
  fornecedoresFiltrados!: Observable<RelacionamentoFornecedor[]>;

  vacinas: RelacionamentoVacina[] = [];
  vacinasFiltradas!: Observable<RelacionamentoVacina[]>;

  constructor(
    private _service: CompraVacinaService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _dialogoConf: MatDialog,
    private serviceVacina: VacinaService,
    private serviceFornecedor: FornecedorService
  ) {
    super();

    this.definirAtributosInjetores();
    this.definirIdentificadoresEntidade();
    this.preencherAtributosGenericosCrud();
  }
  override ngOnInit(): void {
    super.ngOnInit();
  }

  private definirAtributosInjetores() {
    this.service = this._service;
    this.formBuilder = this._formBuilder;
    this.router = this._router;
    this.activatedRoute = this._activatedRoute;
    this.dialogoConf = this._dialogoConf;
  }

  private definirIdentificadoresEntidade() {
    this.nomeEntidade = 'compra';
    this.pluralEntidade = 'compras';
    this.artigoEntidade = 'a';
    this.nomeCampoFormIdentificaEntidade = 'nota fiscal';
  }

  protected override buildForm() {
    this.form = this.formBuilder.group({
      _id: [null],
      nota_fiscal: [null, ValidatorsUtil.getValidadorObrigatorioSemEspacos()],
      data_compra: [null, ValidatorsUtil.getValidadorObrigatorioSemEspacos()],
      vl_total_compra: [
        0.00,
        ValidatorsUtil.getValidadorObrigatorioSemEspacos(),
      ],
      fornecedor: [
        null,
        Validators.compose([
          ValidatorsUtil.getValidadorObrigatorioSemEspacos(),
          ValidatorsUtil.getValidatorValorExisteInpuAutoComplete(),
        ]),
      ],
      itens_compra: this.formBuilder.group({
        vacina: [null],
      }),
      // lote: [null, ValidatorsUtil.getValidadorObrigatorioSemEspacos()],
      // qtd_frascos: [null, ValidatorsUtil.getValidadorObrigatorioSemEspacos()],
      // qtd_doses: [null, ValidatorsUtil.getValidadorObrigatorioSemEspacos()],
      // data_validade: [null, ValidatorsUtil.getValidadorObrigatorioSemEspacos()],
      // vl_total_item_compra: [null, ValidatorsUtil.getValidadorObrigatorioSemEspacos()],
      // }),
    });

    this.preencherCamposLookup();
  }

  private preencherCamposLookup() {
    this.setLookupFornecedor();
    // this.setLookupVacina();
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
          this.setChangeFornecedorParaFiltrarValores();
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
      this.nomeCtrlVacinaCompleto
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
    return v.nome ? v.nome : '';
  }
}
