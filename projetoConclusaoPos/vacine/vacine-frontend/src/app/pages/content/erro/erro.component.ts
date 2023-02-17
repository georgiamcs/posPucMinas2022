import { GenericPageComponent } from 'src/app/components/generic-page/generic-page.component';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'vacine-erro',
  templateUrl: './erro.component.html',
  styleUrls: ['./erro.component.scss']
})
export class ErroComponent extends GenericPageComponent{

  constructor(private _router: Router) {
    super();
    this.router = _router;
    this.carregarMensagensAoIniciar();
  }

}
