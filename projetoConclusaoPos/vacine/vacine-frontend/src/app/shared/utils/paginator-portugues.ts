import { MatPaginatorIntl } from '@angular/material/paginator';
import { Subject } from 'rxjs';

export class PaginatorPortugues implements MatPaginatorIntl {
  changes = new Subject<void>();

  // For internationalization, the `$localize` function from
  // the `@angular/localize` package can be used.
  firstPageLabel = $localize`Primeira página`;
  itemsPerPageLabel = $localize`Itens por página:`;
  lastPageLabel = $localize`Última pagina`;

  // You can set labels to an arbitrary string too, or dynamically compute
  // it through other third-party internationalization libraries.
  nextPageLabel = 'Próxima pagina';
  previousPageLabel = 'Página anterior';

  getRangeLabel(page: number, pageSize: number, length: number): string {
    let footer;
    if (length <= 1) {
      footer = $localize`Página 1 de 1`;
    } else {
      const amountPages = Math.ceil(length / pageSize);
      footer = $localize`Página ${page + 1} de ${amountPages} - Total de ${length} itens`;
    }
    return footer;
  }
}
