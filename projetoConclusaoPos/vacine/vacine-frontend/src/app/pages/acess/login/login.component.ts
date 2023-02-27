import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { GenericPageFormComponent } from 'src/app/components/generic-page-form/generic-page-form.component';

import { ControleAcessoService } from 'src/app/services/authentication/controle-acesso/controle-acesso.service';
import { MensagemFeedback } from 'src/app/shared/classes/mensagem-feedback.class';
import { RetornoHttp } from 'src/app/shared/enums/retorno-http.enum';
import { TipoMensagemFeedback } from 'src/app/shared/enums/tipo-mensagem-feedback.enum';
import { ValidatorsUtil } from 'src/app/shared/utils/validators-util.util';

import { LoginUsuario } from '../../../shared/interfaces/login-usuario.interface';

@Component({
  selector: 'vacine-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends GenericPageFormComponent {
  logado: boolean = false;

  constructor(
    protected override changeDetectorRef: ChangeDetectorRef,
    protected override media: MediaMatcher,
    protected override router: Router,
    protected override formBuilder: FormBuilder,
    private serviceAcesso: ControleAcessoService,
    private serviceAutRedeSocial: SocialAuthService
  ) {
    super(changeDetectorRef, media, router, formBuilder);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.buildForm();

    this.subscription = this.serviceAutRedeSocial.authState.subscribe(
      (user) => {
        if (user && !this.logado) {
          this.logandoFormulario(true);
          this.logarGoogle(user);
        }
      }
    );
  }

  login(): void {
    // Efetuando o login
    const login: LoginUsuario = {
      email: this.form.value.email,
      senha: this.form.value.senha,
    };

    this.logandoFormulario(true);
    this.logarJwt(login);
  }

  protected buildForm() {
    this.form = this.formBuilder.group({
      email: [null, ValidatorsUtil.getValidadorObrigatorioSemEspacos()],
      senha: [null, ValidatorsUtil.getValidadorObrigatorioSemEspacos()],
    });
  }

  private logarJwt(loginUsuario: LoginUsuario) {
    this.subscription = this.serviceAcesso.loginJwt(loginUsuario).subscribe({
      next: (result) => {
        this.serviceAcesso.setTokenUsuario(result);
        this.deleteAllMensagem();
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.logandoFormulario(false);
        this.tratarErroLogin(err);
      },
    });
  }

  private logarGoogle(usuario: SocialUser) {
    this.subscription = this.serviceAcesso.loginGoogle(usuario).subscribe({
      next: (result) => {
        this.serviceAcesso.setTokenUsuario(result);
        this.deleteAllMensagem();
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.logandoFormulario(false);
        this.tratarErroLogin(err);
      },
    });
  }

  private tratarErroLogin(error: any) {
    if (error.status === RetornoHttp.HTTP_NOT_ACCEPTED) {
      this.addMensagem(
        new MensagemFeedback(
          TipoMensagemFeedback.ERRO,
          'Usuário ou senha inválidos.'
        )
      );
    } else {
      this.tratarErro(`Erro ao efetuar login: ${error.message}`);
    }
  }

  readOnly() {
    return this.logado;
  }

  private logandoFormulario(logou: boolean) {
    this.logado = logou;
    if (logou) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }
}
