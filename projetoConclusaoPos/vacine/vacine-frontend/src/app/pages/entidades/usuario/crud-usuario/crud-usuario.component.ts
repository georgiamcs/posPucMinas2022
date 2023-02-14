//TODO: na edicao, nao mostrar senha e confirmar senha, fazer funcionalidade de troca de senha
import { Component } from '@angular/core';
import {
  AbstractControlOptions,
  FormBuilder, Validators
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudComponent } from 'src/app/components/crud/crud.component';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { ModoFormulario } from 'src/app/shared/enums/modo-formulario.enum';
import { Usuario } from 'src/app/shared/models/usuario.model';
import { validadoresRequeridoSemEspacos } from 'src/app/shared/utils/util';
import { UtilValidators } from 'src/app/validators/util-validators';
import { Acesso } from '../../../../shared/classes/acesso.class';
import { TIPOS_USUARIOS } from '../../../../shared/enums/tipo-usuario.enum';

@Component({
  selector: 'vacine-crud-usuario',
  templateUrl: './crud-usuario.component.html',
  styleUrls: ['./crud-usuario.component.scss'],
})
export class CrudUsuarioComponent extends CrudComponent<Usuario> {
  protected perfisEscolher = Acesso.PERFIS;
  protected tiposUsuarios = TIPOS_USUARIOS;

  constructor(
    private _service: UsuarioService,
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
    this.nomeEntidade = 'usuario';
    this.pluralEntidade = 'usuarios';
    this.artigoEntidade = 'o';
    this.nomeCampoFormIdentificaEntidade = 'nome';
  }

  protected override preencherFormComRegistroId(registro: any): void {
    super.preencherFormComRegistroId(registro);

    if (this.modoFormulario == ModoFormulario.ALTERACAO) {
      // this.form.value.senha = null;
      this.definirValorCampoForm('senha', null);
    }
  }

  protected override buildForm() {
    this.form = this.formBuilder.group(
      {
        _id: [null],
        tipo: [null],
        nome: [
          null,
          Validators.compose([
            validadoresRequeridoSemEspacos(),
            Validators.minLength(3),
            Validators.maxLength(100),
          ]),
        ],
        cpf: [null, null],
        email: [
          null,
          Validators.compose([
            validadoresRequeridoSemEspacos(),
            Validators.email,
          ]),
        ],
        senha: [
          null,
          Validators.compose([
            validadoresRequeridoSemEspacos(),
            Validators.minLength(5),
            Validators.maxLength(20),
          ]),
        ],
        confSenha: [
          null,
          Validators.compose([
            validadoresRequeridoSemEspacos(),
            Validators.minLength(5),
            Validators.maxLength(20),
          ]),
        ],
        perfis: [null, Validators.required],
        endereco: this.formBuilder.group({
          logradouro: [null, null],
          numero: [null, null],
          complemento: [null],
          cep: [
            null,
            Validators.compose([
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
            Validators.minLength(11),
            Validators.maxLength(11),
          ]),
        ],
      },
      {
        validator: UtilValidators.confirmaSenhaValidator,
      } as AbstractControlOptions
    );
  }

  protected marcarPerfisDefaultTipoUsuario(): void {
    const tpUser = this.recuperarValorCampoForm('tipo');
    const obj = this.tiposUsuarios.find((o) => o.valor == tpUser);
    let perfisDefault;

    if (obj != null || obj != undefined) {
      perfisDefault = obj.itens;
    }
    this.definirValorCampoForm('perfis', perfisDefault);
  }
}
