import { Component } from '@angular/core';

import { MensagemFeedback } from '../../classes/mensagem-feedback.class';
import { CrudModel } from 'src/app/shared/models/crud.model';
import { Router } from '@angular/router';

@Component({
  selector: 'vacine-listar-registros',
  templateUrl: './listar-registros.component.html',
  styleUrls: ['./listar-registros.component.scss'],
})
export class ListarRegistrosComponent<Type extends CrudModel> {
  registros: Type[] = [];

  colunasExibidas: string[] = [];
  mensagens: MensagemFeedback[] = [];

  constructor() {}

  protected carregarMensagensAoIniciar(router: Router) {
    let msg = router.getCurrentNavigation()?.extras.state?.['alerta'];
    if (msg) {
      this.mensagens.push(msg);
    }
  }
}
