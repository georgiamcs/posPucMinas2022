import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabecalhoComponent } from './paginas/cabecalho/cabecalho.component';
import { RodapeComponent } from './paginas/rodape/rodape.component';
import { MenuComponent } from './paginas/menu/menu.component';
import { ConteudoComponent } from './paginas/conteudo/conteudo.component';

@NgModule({
  declarations: [
    AppComponent,
    CabecalhoComponent,
    RodapeComponent,
    MenuComponent,
    ConteudoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
