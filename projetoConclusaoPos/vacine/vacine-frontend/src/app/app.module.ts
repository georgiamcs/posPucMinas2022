import { DecimalPipe, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import localePt from '@angular/common/locales/pt';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/app/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { httpInterceptorProviders } from './interceptors/http-request.interceptor';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  MatDialogModule,
  MAT_DIALOG_DEFAULT_OPTIONS,
} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

import {
  GoogleLoginProvider,
  SocialAuthServiceConfig,
  SocialLoginModule,
} from '@abacritt/angularx-social-login';
import { GenericCrudComLookupComponent } from './components/generic-crud-com-lookup/generic-crud-com-lookup.component';
import { GenericCrudComponent } from './components/generic-crud/generic-crud.component';
import { DialogoConfirmacaoComponent } from './components/dialogo-confirmacao/dialogo-confirmacao.component';
import { GenericPageComponent } from './components/generic-page/generic-page.component';
import { GenericListarRegistrosComponent } from './components/generic-listar-registros/generic-listar-registros.component';
import { MensagemFeedbackComponent } from './components/mensagem-feedback/mensagem-feedback.component';
import { LoginComponent } from './pages/acesso/login/login.component';
import { LogoutComponent } from './pages/acesso/logout/logout.component';
import { CabecalhoComponent } from './pages/cabecalho/cabecalho.component';
import { ConteudoPrincipalComponent } from './pages/conteudo-principal/conteudo-principal.component';
import { CrudCompraComponent } from './pages/entidades/compra/crud-compra/crud-compra.component';
import { CrudFornecedorComponent } from './pages/entidades/fornecedor/crud-fornecedor/crud-fornecedor.component';
import { ListarFornecedoresComponent } from './pages/entidades/fornecedor/listar-fornecedores/listar-fornecedores.component';
import { CrudUsuarioComponent } from './pages/entidades/usuario/crud-usuario/crud-usuario.component';
import { ListarUsuariosComponent } from './pages/entidades/usuario/listar-usuarios/listar-usuarios.component';
import { TrocarSenhaComponent } from './pages/entidades/usuario/trocar-senha/trocar-senha.component';
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
import { TruncstrPipe } from './shared/pipes/truncstr/truncstr.pipe';
import { ListarComprasVacinaComponent } from './pages/entidades/compra/listar-compras-vacina/listar-compras-vacina.component';

registerLocaleData(localePt);

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
    GenericCrudComponent,
    MensagemFeedbackComponent,
    GenericListarRegistrosComponent,
    ListarFornecedoresComponent,
    CnpjPipe,
    TelefonePipe,
    CrudFornecedorComponent,
    ListarUsuariosComponent,
    CpfPipe,
    CrudUsuarioComponent,
    HomeComponent,
    LoginComponent,
    LogoutComponent,
    GenericPageComponent,
    ErroComponent,
    TrocarSenhaComponent,
    CrudCompraComponent,
    GenericCrudComLookupComponent,
    TruncstrPipe,
    ListarComprasVacinaComponent,
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
    MatAutocompleteModule,
    DecimalPipe,
  ],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
    { provide: LOCALE_ID, useValue: 'pt' },
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
