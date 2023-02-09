import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { Fornecedor } from './../../../shared/models/fornecedor.model';
import { CrudComponent } from '../../../shared/components/crud/crud.component';
import { FornecedorService } from 'src/app/services/fornecedor/fornecedor.service';
import { validadoresRequeridoSemEspacos } from 'src/app/shared/utils/util';

@Component({
  selector: 'vacine-crud-fornecedor',
  templateUrl: './crud-fornecedor.component.html',
  styleUrls: ['./crud-fornecedor.component.scss'],
})
export class CrudFornecedorComponent
  extends CrudComponent<Fornecedor>
{
  constructor(
    private _service: FornecedorService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    public _dialogoConf: MatDialog
  ) {
    super();
    this.definirAtributosInjetores();
    this.definirIdentificadoresEntidade();
    this.preencherAtributosGenericosCrud();
  }

  private definirAtributosInjetores() {
    this.service = this._service;
    this.formBuilder = this._formBuilder;
    this.router = this._router;
    this.activatedRoute = this._activatedRoute;
    this.dialogoConf = this._dialogoConf;
  }

  private definirIdentificadoresEntidade() {
    this.nomeEntidade = 'fornecedor';
    this.pluralEntidade = 'fornecedores';
    this.artigoEntidade = 'o';
    this.nomeCampoFormIdentificaEntidade = 'nome';
  }

  protected override buildForm() {
    this.form = this.formBuilder.group({
      _id: [null],
      cnpj: [
        null,
        Validators.compose([
          validadoresRequeridoSemEspacos(),
          Validators.minLength(14),
          Validators.maxLength(14),
        ]),
      ],
      nome: [
        null,
        Validators.compose([
          validadoresRequeridoSemEspacos(),
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
      email: [null, Validators.compose([validadoresRequeridoSemEspacos(), Validators.email])],
      endereco: this.formBuilder.group({
        logradouro: [null, validadoresRequeridoSemEspacos()],
        numero: [null, validadoresRequeridoSemEspacos()],
        complemento: [null],
        cep: [null, validadoresRequeridoSemEspacos()],
      }),
      tel_fixo: [
        null,
        Validators.compose([
          validadoresRequeridoSemEspacos(),
          Validators.minLength(10),
          Validators.maxLength(10),
        ]),
      ],
      tel_celular: [
        null,
        Validators.compose([
          validadoresRequeridoSemEspacos(),
          Validators.minLength(11),
          Validators.maxLength(11),
        ]),
      ],
    });
  }

}
