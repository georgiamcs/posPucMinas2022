//TODO: LOGIN GOOGLE
//import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { GenericPageComponent } from 'src/app/components/generic-page/generic-page.component';
import { MensagemFeedback } from 'src/app/shared/classes/mensagem-feedback.class';
import { RetornoHttp } from 'src/app/shared/enums/retorno-http.enum';
import { TipoMensagemFeedback } from 'src/app/shared/enums/tipo-mensagem-feedback.enum';
import { ControleAcessoService } from '../../../services/autenticacao/controle-acesso/controle-acesso.service';
import { LoginUsuario } from '../../../shared/interfaces/login-usuario.interface';

@Component({
  selector: 'vacine-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends GenericPageComponent {
  constructor(
    private formBuilder: FormBuilder,
    private serviceAcesso: ControleAcessoService,
    private _router: Router
  ) {
    super();
    this.router = this._router;
  }

  form!: FormGroup;
  logado: boolean = false;

  override ngOnInit(): void {
    super.ngOnInit();
    this.buildForm();
    // TODO: LOGIN GOOGLE
    // this.socialAuthService.authState.subscribe((user) => {
    //   if (user && !this.logando) {
    //     console.log('login google');
    //     this.logandoFormulario(true);
    //     this.logarGoogle(user);
    //   }
    // });
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
      email: [{ value: '', disabled: this.readOnly() }, Validators.required],
      senha: [{ value: '', disabled: this.readOnly() }, Validators.required],
    });
  }

  // TODO: LOGIN GOOGLE
  // private logarGoogle(usuario: SocialUser) {
  //   this.jwtAuthService
  //     .loginGoogle(usuario)
  //     .pipe(
  //       catchError((err) => {
  //         this.logandoFormulario(false);
  //         this.alertas.push({
  //           tipo: 'danger',
  //           mensagem: `${err.error?.error}`,
  //         });
  //         throw 'Erro ao efetuar login. Detalhes: ' + err.error?.error;
  //       })
  //     )
  //     .subscribe(() => {
  //       this.alertas = [];
  //       this.router.navigate(['/home']);
  //     });
  // }

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
