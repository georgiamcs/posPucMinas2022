import { Component, OnDestroy, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CrudModel } from 'src/app/shared/models/crud.model';
import { MensagemFeedback } from '../../classes/mensagem-feedback.class';
import { CrudService } from '../../services/crud-service.service';

@Component({
  selector: 'vacine-listar-registros',
  templateUrl: './listar-registros.component.html',
  styleUrls: ['./listar-registros.component.scss'],
})
export class ListarRegistrosComponent<T extends CrudModel>
  implements OnInit, OnDestroy
{
  protected subscription: Subscription;

  protected registros: T[] = [];

  protected colunasExibidas: string[] = [];
  protected mensagens: MensagemFeedback[] = [];

  protected router: Router;
  protected service: CrudService<T>;

  constructor() {}

  ngOnInit(): void {
    this.carregarRegistros();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private tratarErro(erro: string) {
    alert(erro); // TODO: subsutuir para usar componente de mensagem de feedback na tela
  }

  protected carregarMensagensAoIniciar() {
    let msg = this.router.getCurrentNavigation()?.extras.state?.['alerta'];
    if (msg) {
      this.mensagens.push(msg);
    }
  }

  protected carregarRegistros() {
    this.subscription = this.service.listar().subscribe({
      next: (listaReg) => (this.registros = listaReg),
      error: (erro) => this.tratarErro(`Erro ao carregar registros: ${erro}`),
    });
  }
}
