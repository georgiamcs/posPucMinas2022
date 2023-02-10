import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import {
  MatDialogModule,
  MAT_DIALOG_DEFAULT_OPTIONS,
} from '@angular/material/dialog';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {
  NgxMaskDirective,
  NgxMaskPipe,
  provideNgxMask,
} from 'ngx-mask';

import { CabecalhoComponent } from './pages/cabecalho/cabecalho.component';
import { MenuComponent } from './pages/menu/menu.component';
import { ConteudoPrincipalComponent } from './pages/conteudo-principal/conteudo-principal.component';
import { CrudVacinaComponent } from './components/vacina/crud-vacina/crud-vacina.component';
import { ListarVacinasComponent } from './components/vacina/listar-vacinas/listar-vacinas.component';
import { SemRegistrosComponent } from './pages/sem-registros/sem-registros.component';
import { DialogoConfirmacaoComponent } from './shared/components/dialogo-confirmacao/dialogo-confirmacao.component';
import { CrudComponent } from './shared/components/crud/crud.component';
import { MensagemFeedbackComponent } from './shared/components/mensagem-feedback/mensagem-feedback.component';
import { ListarRegistrosComponent } from './shared/components/listar-registros/listar-registros.component';
import { ListarFornecedoresComponent } from './components/fornecedor/listar-fornecedores/listar-fornecedores.component';
import { CnpjPipe } from './shared/pipes/cnpj/cnpj.pipe';
import { TelefonePipe } from './shared/pipes/telefone/telefone.pipe';
import { CrudFornecedorComponent } from './components/fornecedor/crud-fornecedor/crud-fornecedor.component';
import { MensagemErroInputComponent } from './shared/components/mensagem-erro-input/mensagem-erro-input.component';
import { ListarUsuariosComponent } from './components/usuario/listar-usuarios/listar-usuarios.component';
import { CpfPipe } from './shared/pipes/cpf/cpf.pipe';
import { CrudUsuarioComponent } from './components/usuario/crud-usuario/crud-usuario.component';


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
    NgbModule,
    MatDialogModule,
    MatDividerModule,
    MatSelectModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
    provideNgxMask(),
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
