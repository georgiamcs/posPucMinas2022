import { SlicePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncstr',
})
export class TruncstrPipe implements PipeTransform {
  transform(
    value: string | null | undefined,
    qtdCaracteres: number
  ): string | null | undefined {
    let str = value;
    // let comPontinhos =

    if (!!value) {
        str = value.substring(-1, qtdCaracteres);

        str = str.length < value.length ? `${str}...` : str;
    }

    return str;
  }
}
