import { RelacionamentoVacina } from './../../../shared/interfaces/relacionamento-vacina.interface';
import { RelacionamentoFornecedor } from './../../../shared/interfaces/relacionamento-fornecedor.interface';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { GenericCrudComLookupComponent } from 'src/app/components/generic-crud-com-lookup/generic-crud-com-lookup.component';
import { VacinaService } from 'src/app/services/entidades/vacina/vacina.service';
import { FornecedorService } from '../../../services/entidades/fornecedor/fornecedor.service';
import { Fornecedor } from '../../../shared/models/fornecedor.model';
import { Vacina } from '../../../shared/models/vacina.model';
import { CompraVacinaService } from './../../../services/entidades/compra-vacina/compra-vacina.service';
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
  protected readonly nomeControlFornecedor = 'fornecedor';
  protected readonly nomeControlVacina = 'vacina';

  protected readonly nomeAtributoExibirFornecedor = 'fornecedor_nome';
  protected readonly nomeAtributoExibirVacina = 'vacina_nome';

  fornecedores: Fornecedor[] = [];
  fornecedoresFiltrados!: Observable<Fornecedor[]>;

  vacinas: Vacina[] = [];
  vacinasFiltradas!: Observable<Vacina[]>;

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
  /*
  fornecedor_id: string;
  fornecedor_nome: string;
  fornecedor_cnpj: string;
  nota_fiscal: string;
  data_compra: Date;
  vl_total_compra: number;
  itens_compra: ItemCompraVacina[];
*/
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
    this.subscription = this.serviceFornecedor.listar().subscribe({
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
        this.filtrarPeloValorAtributo(
          this.fornecedores,
          value,
          this.nomeControlFornecedor,
          this.nomeAtributoExibirFornecedor
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
        this.filtrarPeloValorAtributo(
          this.vacinas,
          value,
          this.nomeControlVacina,
          this.nomeAtributoExibirVacina
        )
      )
    );
  }

  protected exibirTextoLookupFornecedor(f: RelacionamentoFornecedor): string {
    return this.exibirTextoLookup(f[this.nomeAtributoExibirFornecedor]);
  }

  protected exibirTextoLookupVacina(v: RelacionamentoVacina): string {
    return this.exibirTextoLookup(v[this.nomeAtributoExibirVacina]);
  }
}
