import { Component, OnDestroy, OnInit } from '@angular/core';
import { GenericFormComponent } from './../generic-form/generic-form.component';

import { CrudModel } from 'src/app/shared/models/crud.model';
import { CrudService } from 'src/app/shared/services/crud-service.service';

@Component({
  selector: 'vacine-listar-registros',
  templateUrl: './listar-registros.component.html',
  styleUrls: ['./listar-registros.component.scss'],
})
export class ListarRegistrosComponent<T extends CrudModel>
  extends GenericFormComponent
  implements OnInit, OnDestroy
{
  protected registros: T[] = [];

  protected colunasExibidas: string[] = [];

  protected service: CrudService<T>;

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.carregarRegistros();
  }

  protected carregarRegistros() {
    this.subscription = this.service.listar().subscribe({
      next: (listaReg) => (this.registros = listaReg),
      error: (erro) => this.tratarErro(`Erro ao carregar registros: ${erro}`),
    });
  }
}
