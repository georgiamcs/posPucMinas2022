import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { CrudComLookupComponent } from 'src/app/components/crud-com-lookup/crud-com-lookup.component';
import { VacinaService } from 'src/app/services/vacina/vacina.service';
import { FornecedorService } from './../../../../services/fornecedor/fornecedor.service';
import { Fornecedor } from './../../../../shared/models/fornecedor.model';
import { Vacina } from './../../../../shared/models/vacina.model';

@Component({
  selector: 'vacine-crud-compra',
  templateUrl: './crud-compra.component.html',
  styleUrls: ['./crud-compra.component.scss'],
})
export class CrudCompraComponent
  extends CrudComLookupComponent<Fornecedor>
  implements OnInit
{
  protected readonly nomeControlFornecedor = 'fornecedor';
  protected readonly nomeControlVacina = 'vacina';

  fornecedores: Fornecedor[] = [];
  fornecedoresFiltrados!: Observable<Fornecedor[]>;

  vacinas: Vacina[] = [];
  vacinasFiltradas!: Observable<Fornecedor[]>;

  constructor(
    private _service: FornecedorService,
    private serviceVacina: VacinaService,
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
      fornecedor: [null],
      vacina: [null],
    });

    this.preencherCamposLookup();
    this.setChangeParaFiltrarValoresCamposLookup();
  }

  private preencherCamposLookup() {
    this.setLookupFornecedor();
    this.setLookupVacina();
  }

  private setChangeParaFiltrarValoresCamposLookup() {
    this.setChangeFornecedorParaFiltrarValores();
    this.setChangeVacinaParaFiltrarValores();
  }

  private setLookupFornecedor() {
    this.subscription = this.service.listar().subscribe({
      next: (listaFornecedor) => {
        this.fornecedores = listaFornecedor;
      },
      error: (e) => {
        this.tratarErroCarregarLookup(e, this.nomeControlFornecedor);
      },
    });
  }

  private setLookupVacina() {
    this.subscription = this.serviceVacina.listar().subscribe({
      next: (listaVacina) => {
        this.vacinas = listaVacina;
      },
      error: (e) => {
        this.tratarErroCarregarLookup(e, this.nomeControlVacina);
      },
    });
  }

  private setChangeFornecedorParaFiltrarValores() {
    this.fornecedoresFiltrados = this.form.controls[
      this.nomeControlFornecedor
    ].valueChanges.pipe(
      startWith(''),
      map((value) =>
        this.filtrarPeloValor(
          this.fornecedores,
          value,
          this.nomeControlFornecedor
        )
      )
    );
  }

  private setChangeVacinaParaFiltrarValores() {
    this.vacinasFiltradas = this.form.controls[
      this.nomeControlVacina
    ].valueChanges.pipe(
      startWith(''),
      map((value) =>
        this.filtrarPeloValor(this.vacinas, value, this.nomeControlVacina)
      )
    );
  }
}
