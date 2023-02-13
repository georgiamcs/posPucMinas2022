import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/app/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { httpInterceptorProviders } from './interceptors/http-request.interceptor';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  MatDialogModule,
  MAT_DIALOG_DEFAULT_OPTIONS
} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

import {
  GoogleLoginProvider,
  SocialAuthServiceConfig,
  SocialLoginModule
} from '@abacritt/angularx-social-login';
import { CrudComponent } from './components/crud/crud.component';
import { DialogoConfirmacaoComponent } from './components/dialogo-confirmacao/dialogo-confirmacao.component';
import { GenericPageComponent } from './components/generic-page/generic-page.component';
import { ListarRegistrosComponent } from './components/listar-registros/listar-registros.component';
import { MensagemErroInputComponent } from './components/mensagem-erro-input/mensagem-erro-input.component';
import { MensagemFeedbackComponent } from './components/mensagem-feedback/mensagem-feedback.component';
import { LoginComponent } from './pages/acesso/login/login.component';
import { LogoutComponent } from './pages/acesso/logout/logout.component';
import { CabecalhoComponent } from './pages/cabecalho/cabecalho.component';
import { ConteudoPrincipalComponent } from './pages/conteudo-principal/conteudo-principal.component';
import { CrudFornecedorComponent } from './pages/entidades/fornecedor/crud-fornecedor/crud-fornecedor.component';
import { ListarFornecedoresComponent } from './pages/entidades/fornecedor/listar-fornecedores/listar-fornecedores.component';
import { CrudUsuarioComponent } from './pages/entidades/usuario/crud-usuario/crud-usuario.component';
import { ListarUsuariosComponent } from './pages/entidades/usuario/listar-usuarios/listar-usuarios.component';
import { CrudVacinaComponent } from './pages/entidades/vacina/crud-vacina/crud-vacina.component';
import { ListarVacinasComponent } from './pages/entidades/vacina/listar-vacinas/listar-vacinas.component';
import { ErroComponent } from './pages/erro/erro.component';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './pages/menu/menu.component';
import { SemRegistrosComponent } from './pages/sem-registros/sem-registros.component';
import { SecurityProvider } from './providers/security.provider';
import { CnpjPipe } from './shared/pipes/cnpj/cnpj.pipe';
import { CpfPipe } from './shared/pipes/cpf/cpf.pipe';
import { TelefonePipe } from './shared/pipes/telefone/telefone.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CabecalhoComponent,
    MenuComponent,
    ConteudoPrincipalComponent,
    CrudVacinaComponent,
    ListarVacinasComponent,
    SemRegistrosComponent,
    DialogoConfirmacaoComponent,
    CrudComponent,
    MensagemFeedbackComponent,
    ListarRegistrosComponent,
    ListarFornecedoresComponent,
    CnpjPipe,
    TelefonePipe,
    CrudFornecedorComponent,
    MensagemErroInputComponent,
    ListarUsuariosComponent,
    CpfPipe,
    CrudUsuarioComponent,
    HomeComponent,
    LoginComponent,
    LogoutComponent,
    GenericPageComponent,
    ErroComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatListModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatRadioModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    HttpClientModule,
    MatProgressBarModule,
    NgbModule,
    MatDialogModule,
    MatDividerModule,
    MatSelectModule,
    NgxMaskDirective,
    NgxMaskPipe,
    SocialLoginModule,
  ],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
    provideNgxMask(),
    SecurityProvider,
    httpInterceptorProviders,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(environment.GOOGLE_CLIENT_ID),
          },
        ],
        onError: (err) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
