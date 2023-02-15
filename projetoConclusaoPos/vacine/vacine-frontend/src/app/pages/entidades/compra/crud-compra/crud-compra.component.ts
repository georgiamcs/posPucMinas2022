import { CrudComLookupComponent } from 'src/app/components/crud-com-lookup/crud-com-lookup.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { MensagemFeedback } from 'src/app/shared/classes/mensagem-feedback.class';
import { CrudComponent } from './../../../../components/crud/crud.component';
import { FornecedorService } from './../../../../services/fornecedor/fornecedor.service';
import { TipoMensagemFeedback } from './../../../../shared/enums/tipo-mensagem-feedback.enum';
import { Fornecedor } from './../../../../shared/models/fornecedor.model';

@Component({
  selector: 'vacine-crud-compra',
  templateUrl: './crud-compra.component.html',
  styleUrls: ['./crud-compra.component.scss'],
})
export class CrudCompraComponent
  extends CrudComLookupComponent<Fornecedor>
  implements OnInit
{
  //Filtro de fornecedores
  fornecedores: Fornecedor[] = [];
  fornecedoresFiltrados!: Observable<Fornecedor[]>;

  constructor(
    private _service: FornecedorService,
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

    this.subscription = this.service.listar().subscribe({
      next: (lista) => {
        this.fornecedores = lista;
        console.log(lista);
      },
      error: (e) => {
        this.erroCarregando = true;
        this.isCarregando = false;
        this.addMensagem(
          new MensagemFeedback(
            TipoMensagemFeedback.ERRO,
            'Erro ao recuperar fornecedores!'
          )
        );
        throw 'Erro ao recuperar fornecedores! Detalhes: ' + e;
      },
    });
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
    });

    this.fornecedoresFiltrados = this.form.controls[
      'fornecedor'
    ].valueChanges.pipe(
      startWith(''),
      map((value) => {
        let ehString = typeof value === 'string';
        const nome = typeof value === 'string' ? value : value?.nome;

        if (
          ehString &&
          nome &&
          nome != '' &&
          this.fornecedores &&
          this.fornecedores.length > 0
        ) {
          //https://stackoverflow.com/questions/45241103/patchvalue-with-emitevent-false-triggers-valuechanges-on-angular-4-formgrou
          let user = this.fornecedores.find(
            (user) => user.nome.toLowerCase() == nome.toLowerCase()
          );
          if (user) {
            this.form.get('fornecedor')!.patchValue(user, { emitEvent: false });
          }
        }
        return nome
          ? this.filtrarValorLista(this.fornecedores, nome as string)
          : this.fornecedores.slice();
      })
    );
  }
}
