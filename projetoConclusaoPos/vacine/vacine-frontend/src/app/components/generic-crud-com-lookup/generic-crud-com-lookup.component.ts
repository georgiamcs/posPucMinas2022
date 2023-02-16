import { Component } from '@angular/core';
import { GenericCrudComponent } from 'src/app/components/generic-crud/generic-crud.component';
import { MensagemFeedback } from 'src/app/shared/classes/mensagem-feedback.class';
import { TipoMensagemFeedback } from 'src/app/shared/enums/tipo-mensagem-feedback.enum';
import { EntityModel } from 'src/app/shared/models/entity.model';
import { EntityNomeModel } from '../../shared/models/entity-nome.model';

@Component({
  selector: 'vacine-generic-crud-com-lookup',
  templateUrl: './generic-crud-com-lookup.component.html',
  styleUrls: ['./generic-crud-com-lookup.component.scss'],
})
export class GenericCrudComLookupComponent<
  T extends EntityModel
> extends GenericCrudComponent<T> {
  protected isCarregando: boolean = false;
  protected erroCarregando: boolean = false;

  protected filtrarValorLista(lista: EntityNomeModel[], nome: string): any[] {
    const filterValue = nome.toLowerCase();
    return lista.filter((i) => i.nome.toLowerCase().includes(filterValue));
  }

  protected exibirNomeEntidade(entity: any): string {
    return entity?.nome ? entity.nome : '';
  }

  protected tratarErroCarregarLookup(erro: any, nomeCampo: string) {
    this.erroCarregando = true;
    this.isCarregando = false;
    this.addMensagem(
      new MensagemFeedback(
        TipoMensagemFeedback.ERRO,
        `Erro ao recuperar lista de! ${nomeCampo}. Detalhe do erro: ${erro}`
      )
    );
  }

  protected filtrarPeloValor(
    lista: any[],
    valor: any,
    nomeFormControl: string
  ): any[] {
    let ehString = typeof valor === 'string';
    const nome = typeof valor === 'string' ? valor : valor?.nome;

    if (ehString && nome && nome != '' && lista && lista.length > 0) {
      let item = lista.find(
        (item) => item.nome.toLowerCase() == nome.toLowerCase()
      );
      if (item) {
        this.form.get(nomeFormControl)!.patchValue(item, { emitEvent: false });
      }
    }
    return nome ? this.filtrarValorLista(lista, nome as string) : lista.slice();
  }
}
