import { DecimalPipe, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import ptBr from '@angular/common/locales/pt';
import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/app/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { httpInterceptorProviders } from './interceptors/http-request.interceptor';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ErrorStateMatcher, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatDialogModule,
  MAT_DIALOG_DEFAULT_OPTIONS
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
  CurrencyMaskConfig,
  CurrencyMaskModule,
  CURRENCY_MASK_CONFIG
} from 'ng2-currency-mask';

import {
  GoogleLoginProvider,
  SocialAuthServiceConfig,
  SocialLoginModule
} from '@abacritt/angularx-social-login';
import { MatExpansionModule } from '@angular/material/expansion';
import { DialogoConfirmacaoComponent } from './components/dialogo-confirmacao/dialogo-confirmacao.component';
import { GenericCrudComLookupComponent } from './components/generic-crud-com-lookup/generic-crud-com-lookup.component';
import { GenericCrudComponent } from './components/generic-crud/generic-crud.component';
import { GenericListarRegistrosComponent } from './components/generic-listar-registros/generic-listar-registros.component';
import { GenericPageComponent } from './components/generic-page/generic-page.component';
import { MensagemFeedbackComponent } from './components/mensagem-feedback/mensagem-feedback.component';
import { LoginComponent } from './pages/acess/login/login.component';
import { LogoutComponent } from './pages/acess/logout/logout.component';
import { CabecalhoComponent } from './pages/content/cabecalho/cabecalho.component';
import { ConteudoPrincipalComponent } from './pages/content/conteudo-principal/conteudo-principal.component';
import { ErroComponent } from './pages/content/erro/erro.component';
import { HomeComponent } from './pages/content/home/home.component';
import { MenuComponent } from './pages/content/menu/menu.component';
import { SemRegistrosComponent } from './pages/content/sem-registros/sem-registros.component';
import { CrudCompraVacinaComponent } from './pages/forms/crud-compra-vacina/crud-compra-vacina.component';
import { CrudFornecedorComponent } from './pages/forms/crud-fornecedor/crud-fornecedor.component';
import { CrudUsuarioComponent } from './pages/forms/crud-usuario/crud-usuario.component';
import { CrudVacinaComponent } from './pages/forms/crud-vacina/crud-vacina.component';
import { TrocarSenhaComponent } from './pages/forms/trocar-senha/trocar-senha.component';
import { ListarComprasVacinaComponent } from './pages/lists/listar-compras-vacina/listar-compras-vacina.component';
import { ListarFornecedoresComponent } from './pages/lists/listar-fornecedores/listar-fornecedores.component';
import { ListarUsuariosComponent } from './pages/lists/listar-usuarios/listar-usuarios.component';
import { ListarVacinasComponent } from './pages/lists/listar-vacinas/listar-vacinas.component';
import { SecurityProvider } from './providers/security.provider';
import { CnpjPipe } from './shared/pipes/cnpj/cnpj.pipe';
import { CpfPipe } from './shared/pipes/cpf/cpf.pipe';
import { TelefonePipe } from './shared/pipes/telefone/telefone.pipe';
import { TruncstrPipe } from './shared/pipes/truncstr/truncstr.pipe';

registerLocaleData(ptBr);

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: 'right',
  allowNegative: false,
  decimal: ',',
  precision: 2,
  prefix: 'R$ ',
  suffix: '',
  thousands: '.',
};

// Para fazer com que o reset form nao deixe as validacoes invalidas dos campos
// https://github.com/angular/components/issues/4190#issuecomment-1326268423
export class CustomMaterialFormsMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}

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
    CrudCompraVacinaComponent,
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
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    CurrencyMaskModule,
  ],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    {
      provide: ErrorStateMatcher,
      useClass: CustomMaterialFormsMatcher,
    },
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },
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
