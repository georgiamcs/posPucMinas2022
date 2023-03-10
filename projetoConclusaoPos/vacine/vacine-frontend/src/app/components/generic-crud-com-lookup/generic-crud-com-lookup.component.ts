import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GenericCrudComponent } from 'src/app/components/generic-crud/generic-crud.component';
import { MensagemFeedback } from 'src/app/shared/classes/mensagem-feedback.class';
import { TipoMensagemFeedback } from 'src/app/shared/enums/tipo-mensagem-feedback.enum';
import { EntityModel } from 'src/app/shared/models/entity.model';

@Component({
  selector: 'vacine-generic-crud-com-lookup',
  templateUrl: './generic-crud-com-lookup.component.html',
  styleUrls: ['./generic-crud-com-lookup.component.scss'],
})
export abstract class GenericCrudComLookupComponent<
  T extends EntityModel
> extends GenericCrudComponent<T> {
  protected isCarregando: boolean = false;
  protected erroCarregando: boolean = false;

  protected filtrarValorLista(
    lista: any[],
    nomeAtributoFiltro: string,
    textoFiltro: string
  ): any[] {
    const filterValue = textoFiltro.trim().toLowerCase();
    return lista.filter((i) =>
      i[nomeAtributoFiltro].trim().toLowerCase().includes(filterValue)
    );
  }

  protected tratarErroCarregarLookup(erro: any, nomeCampo: string) {
    this.erroCarregando = true;
    this.isCarregando = false;
    this.addMensagem(
      new MensagemFeedback(
        TipoMensagemFeedback.ERRO,
        `Erro ao recuperar lista de! ${nomeCampo}. Detalhe do erro: ${erro.message}`
      )
    );
  }

  protected filtrarPeloValorAtributo(
    form: FormGroup,
    lista: any[],
    valor: any,
    nomeFormControl: string,
    nomeAtributo: string
  ): any[] {
    let ehString = typeof valor === 'string';
    const vlAtributo =
      typeof valor === 'string' ? valor : valor?.[nomeAtributo];

    if (
      ehString &&
      vlAtributo &&
      vlAtributo != '' &&
      lista &&
      lista.length > 0
    ) {
      let item = lista.find(
        (item) =>
          item[nomeAtributo].trim().toLowerCase() ==
          vlAtributo.trim().toLowerCase()
      );
      if (item) {
        this.getFormControl(form, nomeFormControl)!.patchValue(item, {
          emitEvent: false,
        });
      }
    }
    return vlAtributo
      ? this.filtrarValorLista(lista, nomeAtributo, vlAtributo as string)
      : lista.slice();
  }

  protected exibirTextoLookup(v: any): string {
    if (v) {
      return v.nome ? v.nome : '';
    } else {
      return '';
    }
  }

  protected ordenarLookup(lista: any[]) {
    lista.sort((a, b) => a.nome.localeCompare(b.nome));
  }
}
