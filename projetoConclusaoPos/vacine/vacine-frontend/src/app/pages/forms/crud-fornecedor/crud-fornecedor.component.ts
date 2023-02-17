import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ESTADOS } from '../../../variables/constantes';

import { GenericCrudComponent } from 'src/app/components/generic-crud/generic-crud.component';
import { FornecedorService } from 'src/app/services/crud/fornecedor/fornecedor.service';
import { Util } from 'src/app/shared/utils/util.util';
import { Fornecedor } from '../../../shared/models/fornecedor.model';

@Component({
  selector: 'vacine-crud-fornecedor',
  templateUrl: './crud-fornecedor.component.html',
  styleUrls: ['./crud-fornecedor.component.scss'],
})
export class CrudFornecedorComponent extends GenericCrudComponent<Fornecedor> {
  protected estados = ESTADOS;

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
          Util.getValidadorObrigatorioSemEspacos(),
          Validators.minLength(14),
          Validators.maxLength(14),
        ]),
      ],
      nome: [
        null,
        Validators.compose([
          Util.getValidadorObrigatorioSemEspacos(),
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
      email: [
        null,
        Validators.compose([
          Util.getValidadorObrigatorioSemEspacos(),
          Validators.email,
        ]),
      ],
      endereco: this.formBuilder.group({
        logradouro: [null, Util.getValidadorObrigatorioSemEspacos()],
        numero: [null, Util.getValidadorObrigatorioSemEspacos()],
        complemento: [null],
        cidade: [null, Util.getValidadorObrigatorioSemEspacos()],
        estado: [null, Util.getValidadorObrigatorioSemEspacos()],
        cep: [
          null,
          Validators.compose([
            Util.getValidadorObrigatorioSemEspacos(),
            Validators.minLength(8),
            Validators.maxLength(8),
          ]),
        ],
      }),
      tel_fixo: [
        null,
        Validators.compose([
          Validators.minLength(10),
          Validators.maxLength(10),
        ]),
      ],
      tel_celular: [
        null,
        Validators.compose([
          Util.getValidadorObrigatorioSemEspacos(),
          Validators.minLength(11),
          Validators.maxLength(11),
        ]),
      ],
    });
  }
}
