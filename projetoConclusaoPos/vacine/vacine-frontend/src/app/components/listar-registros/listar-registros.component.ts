import { Component, OnDestroy, OnInit } from '@angular/core';
import { GenericPageComponent } from '../generic-page/generic-page.component';

import { EntityModel } from 'src/app/shared/models/entity.model';
import { CrudService } from 'src/app/shared/services/crud/crud.service';

@Component({
  selector: 'vacine-listar-registros',
  templateUrl: './listar-registros.component.html',
  styleUrls: ['./listar-registros.component.scss'],
})
export class ListarRegistrosComponent<T extends EntityModel>
  extends GenericPageComponent
  implements OnInit, OnDestroy
{
  protected registros: T[] = [];

  protected colunasExibidas: string[] = [];

  protected service: CrudService<T>;

  protected carregado: boolean = false;

  constructor() {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.carregarRegistros();
  }

  protected carregarRegistros() {
    this.subscription = this.service.listar().subscribe({
      next: (listaReg) => {
        this.carregado = true;
        this.registros = listaReg;
      },
      error: (erro) => {
        this.carregado = false;
        this.tratarErro(
          `Erro ao carregar registros => ${erro.message}. Tente acessar novamente em alguns minutos. Caso o erro persista, contacte o suporte.`
        );
      },
    });
  }
}
