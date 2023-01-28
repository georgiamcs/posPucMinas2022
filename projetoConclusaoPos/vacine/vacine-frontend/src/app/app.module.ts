import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CabecalhoComponent } from './paginas/cabecalho/cabecalho.component';
import { MenuComponent } from './paginas/menu/menu.component';
import { ConteudoComponent } from './paginas/conteudo/conteudo.component';
import { VacinaComponent } from './componentes/vacina/vacina/vacina.component';


@NgModule({
  declarations: [
    AppComponent,
    CabecalhoComponent,
    MenuComponent,
    ConteudoComponent,
    VacinaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
