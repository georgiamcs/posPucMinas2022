import { Component, OnInit } from '@angular/core';

import { MensagemFeedback } from '../../classes/mensagem-feedback.class';
import { CrudModel } from 'src/app/shared/models/crud.model';
import { Router } from '@angular/router';
import { CrudService } from '../../services/crud-service.service';

@Component({
  selector: 'vacine-listar-registros',
  templateUrl: './listar-registros.component.html',
  styleUrls: ['./listar-registros.component.scss'],
})
export class ListarRegistrosComponent<T extends CrudModel> implements OnInit {
  registros: T[] = [];

  colunasExibidas: string[] = [];
  mensagens: MensagemFeedback[] = [];

  protected router: Router;
  protected service: CrudService<T>;

  constructor() {

  }

  ngOnInit(): void {
    this.carregarRegistros();
  }

  protected carregarMensagensAoIniciar() {
    let msg = this.router.getCurrentNavigation()?.extras.state?.['alerta'];
    if (msg) {
      this.mensagens.push(msg);
    }
  }

  protected carregarRegistros() {
    this.service.listar().subscribe((listaReg) => {
      this.registros = listaReg;
    });
  }
}
