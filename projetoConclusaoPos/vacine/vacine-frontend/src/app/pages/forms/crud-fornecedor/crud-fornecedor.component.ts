import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ESTADOS } from '../../../variables/constantes';

import { DeviceDetectorService } from 'ngx-device-detector';
import { GenericCrudComponent } from 'src/app/components/generic-crud/generic-crud.component';
import { FornecedorService } from 'src/app/services/crud/fornecedor/fornecedor.service';
import { ValidatorsUtil } from 'src/app/shared/utils/validators-util.util';
import { Fornecedor } from '../../../shared/models/fornecedor.model';

@Component({
  selector: 'vacine-crud-fornecedor',
  templateUrl: './crud-fornecedor.component.html',
  styleUrls: ['./crud-fornecedor.component.scss'],
})
export class CrudFornecedorComponent extends GenericCrudComponent<Fornecedor> {
  protected estados = ESTADOS;

  constructor(
    private __router: Router,
    private __deviceService: DeviceDetectorService,
    private _activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _dialogoConf: MatDialog,
    private _service: FornecedorService
  ) {
    super(
      __router,
      __deviceService,
      _activatedRoute,
      _formBuilder,
      _dialogoConf,
      _service
    );
  }

  protected override definirIdentificadoresEntidade() {
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
          ValidatorsUtil.getValidadorObrigatorioSemEspacos(),
          Validators.minLength(14),
          Validators.maxLength(14),
        ]),
      ],
      nome: [
        null,
        Validators.compose([
          ValidatorsUtil.getValidadorObrigatorioSemEspacos(),
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
      email: [
        null,
        Validators.compose([
          ValidatorsUtil.getValidadorObrigatorioSemEspacos(),
          Validators.email,
        ]),
      ],
      endereco: this.formBuilder.group({
        logradouro: [null, ValidatorsUtil.getValidadorObrigatorioSemEspacos()],
        numero: [null, ValidatorsUtil.getValidadorObrigatorioSemEspacos()],
        complemento: [null],
        cidade: [null, ValidatorsUtil.getValidadorObrigatorioSemEspacos()],
        estado: [null, ValidatorsUtil.getValidadorObrigatorioSemEspacos()],
        cep: [
          null,
          Validators.compose([
            ValidatorsUtil.getValidadorObrigatorioSemEspacos(),
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
          ValidatorsUtil.getValidadorObrigatorioSemEspacos(),
          Validators.minLength(11),
          Validators.maxLength(11),
        ]),
      ],
    });
  }
}
