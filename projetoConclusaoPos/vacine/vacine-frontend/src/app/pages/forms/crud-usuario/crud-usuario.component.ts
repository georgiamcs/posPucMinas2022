import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';
import {
  AbstractControlOptions,
  FormBuilder,
  Validators
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericCrudComponent } from 'src/app/components/generic-crud/generic-crud.component';
import { ControleAcessoService } from 'src/app/services/authentication/controle-acesso/controle-acesso.service';
import { UsuarioService } from 'src/app/services/crud/usuario/usuario.service';
import { TemaAcessoUsuario } from 'src/app/shared/classes/acesso.class';
import { MensagemFeedback } from 'src/app/shared/classes/mensagem-feedback.class';
import { Usuario } from 'src/app/shared/classes/usuario.class';
import { ModoFormulario } from 'src/app/shared/enums/modo-formulario.enum';
import { TipoMensagemFeedback } from 'src/app/shared/enums/tipo-mensagem-feedback.enum';
import { UtilRota } from 'src/app/shared/utils/rota.util';
import { ValidatorsUtil } from 'src/app/shared/utils/validators-util.util';
import { UtilValidators } from 'src/app/validators/util-validators';
import { ESTADOS } from 'src/app/variables/constantes';
import { ClienteService } from '../../../services/crud/cliente/cliente.service';
import {
  TIPOS_USUARIOS,
  TipoUsuario
} from '../../../shared/enums/tipo-usuario.enum';

@Component({
  selector: 'vacine-crud-usuario',
  templateUrl: './crud-usuario.component.html',
  styleUrls: ['./crud-usuario.component.scss'],
})
export class CrudUsuarioComponent extends GenericCrudComponent<Usuario> {
  protected tiposUsuarios = TIPOS_USUARIOS;
  protected estados = ESTADOS;

  constructor(
    protected override changeDetectorRef: ChangeDetectorRef,
    protected override media: MediaMatcher,
    protected override router: Router,
    protected override serviceAcesso: ControleAcessoService,
    protected override formBuilder: FormBuilder,
    protected override activatedRoute: ActivatedRoute,
    protected override dialogoConf: MatDialog,
    protected override service: UsuarioService,
    private serviceCliente: ClienteService
  ) {
    super(
      changeDetectorRef,
      media,
      router,
      serviceAcesso,
      formBuilder,
      activatedRoute,
      dialogoConf,
      service
    );
  }

  protected getTemaAcesso(): TemaAcessoUsuario {
    return TemaAcessoUsuario.USUARIO;
  }

  protected definirIdentificadoresEntidade() {
    this.nomeEntidade = 'usuario';
    this.pluralEntidade = 'usuarios';
    this.artigoEntidade = 'o';
    this.nomeCampoFormIdentificaEntidade = 'nome';
  }

  protected override preencherFormComRegistroId(registro: any): void {
    super.preencherFormComRegistroId(registro);

    if (this.modoFormulario == ModoFormulario.ALTERACAO) {
      this.setValorCampoForm('senha', null);
    }
  }

  protected habilitaCampoSenha(): boolean {
    return (
      !this.somenteLeitura() && this.modoFormulario != ModoFormulario.ALTERACAO
    );
  }

  isRegistrar(): boolean {
    return this.modoFormulario == ModoFormulario.REGISTRAR;
  }

  protected override registrar() {
    this.subscription = this.serviceCliente
      .registrar(this.form.value)
      .subscribe({
        next: () => this.registroComSucesso(),
        error: (erro) =>
          this.tratarErro(`Erro ao registrar usuário => ${erro}`),
      });
  }

  private registroComSucesso() {
    const msgFeedback = new MensagemFeedback(
      TipoMensagemFeedback.SUCESSO,
      'Usuário registrado com sucesso!'
    );
    const state = UtilRota.gerarStateMsgFeedbackRota(msgFeedback);
    this.router.navigate(['/home'], state);
  }

  protected buildForm() {
    this.form = this.formBuilder.group(
      {
        _id: [null],
        tipo: [
          this.isRegistrar() ? TipoUsuario.CLIENTE : null,
          this.isRegistrar() ? null : Validators.required,
        ],
        nome: [
          null,
          Validators.compose([
            ValidatorsUtil.getValidadorObrigatorioSemEspacos(),
            Validators.minLength(3),
            Validators.maxLength(100),
          ]),
        ],
        cpf: [null, null],
        email: [
          null,
          Validators.compose([
            ValidatorsUtil.getValidadorObrigatorioSemEspacos(),
            Validators.email,
          ]),
        ],
        data_nascimento: [null],
        senha: [
          null,
          this.habilitaCampoSenha()
            ? Validators.compose([
                ValidatorsUtil.getValidadorObrigatorioSemEspacos(),
                Validators.minLength(5),
                Validators.maxLength(20),
              ])
            : null,
        ],
        confSenha: [
          null,
          this.habilitaCampoSenha()
            ? Validators.compose([
                ValidatorsUtil.getValidadorObrigatorioSemEspacos(),
                Validators.minLength(5),
                Validators.maxLength(20),
              ])
            : null,
        ],
        endereco: this.formBuilder.group({
          logradouro: [null, null],
          numero: [null, null],
          complemento: [null],
          cidade: [null, null],
          estado: [null, null],
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
      this.habilitaCampoSenha()
        ? ({
            validator: UtilValidators.confirmaSenhaValidator,
          } as AbstractControlOptions)
        : null
    );
  }
}
