import { Subscription } from 'rxjs';
import { CrudService } from './../../shared/services/crud/crud.service';
import { Component } from '@angular/core';
import { CrudComponent } from 'src/app/components/crud/crud.component';
import { EntityModel } from 'src/app/shared/models/entity.model';
import { EntityNomeModel } from './../../shared/models/entity-nome.model';
import { MensagemFeedback } from 'src/app/shared/classes/mensagem-feedback.class';
import { TipoMensagemFeedback } from 'src/app/shared/enums/tipo-mensagem-feedback.enum';

@Component({
  selector: 'vacine-crud-com-lookup',
  templateUrl: './crud-com-lookup.component.html',
  styleUrls: ['./crud-com-lookup.component.scss'],
})
export class CrudComLookupComponent<
  T extends EntityModel
> extends CrudComponent<T> {
  protected isCarregando: boolean = false;
  protected erroCarregando: boolean = false;

  protected filtrarValorLista(
    lista: EntityNomeModel[],
    nome: string
  ): any[] {
    const filterValue = nome.toLowerCase();
    return lista.filter((i) => i.nome.toLowerCase().includes(filterValue));
  }

  protected exibirNomeEntidade(entity: any): string {
    return entity?.nome ? entity.nome : '';
  }

  protected preencherListaLookup(
    servicoRecuperarLista: CrudService<EntityModel>,
    listaLookup: EntityModel[]
  ): Subscription {
    return servicoRecuperarLista.listar().subscribe({
      next: (lista) => {
        listaLookup = lista;
        console.log('listaLookup', listaLookup);
      },
      error: (e) => {
        this.erroCarregando = true;
        this.isCarregando = false;
        this.addMensagem(
          new MensagemFeedback(
            TipoMensagemFeedback.ERRO,
            'Erro ao recuperar fornecedores!'
          )
        );
        throw 'Erro ao recuperar fornecedores! Detalhes: ' + e;
      },
    });
  }
}
