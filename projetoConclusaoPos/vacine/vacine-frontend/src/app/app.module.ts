import { NgModule } from '@angular/core';
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
import {
  MatDialogModule,
  MAT_DIALOG_DEFAULT_OPTIONS,
} from '@angular/material/dialog';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CabecalhoComponent } from './pages/cabecalho/cabecalho.component';
import { MenuComponent } from './pages/menu/menu.component';
import { ConteudoPrincipalComponent } from './pages/conteudo-principal/conteudo-principal.component';
import { CrudVacinaComponent } from './components/vacina/crud-vacina/crud-vacina.component';
import { ListarVacinasComponent } from './components/vacina/listar-vacinas/listar-vacinas.component';
import { SemRegistrosComponent } from './pages/sem-registros/sem-registros.component';
import { DialogoConfirmacaoComponent } from './components/lib/dialogo-confirmacao/dialogo-confirmacao.component';
import { CrudComponent } from './components/lib/crud/crud.component';


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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
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
  ],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
