import * as XLSX from 'xlsx';

export class Util {
  public static converterUndefinedEmNulo(valor: any): any {
    return valor === undefined ? null : valor;
  }

  public static converterUndefinedEmTrue(valor: any): any {
    return valor === undefined ? true : valor;
  }

  public static converterUndefinedNullStrVazia(
    value: string | undefined | null
  ): string {
    return value ? value : '';
  }

  public static formatarValorDecimal(v: number | null | undefined): string {

    if (v !== null && v !== undefined) {
      return v.toLocaleString('pt-br', { minimumFractionDigits: 2 });
    } else {
      return '';
    }

  }

  // Método para exportar os dados para Excel
  public static exportToExcel(dados: any[], nomePlanilha: string, nomeArquivo: string): void {
    const worksheet = XLSX.utils.json_to_sheet(dados, );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, nomePlanilha);
    XLSX.writeFile(workbook,  `${nomeArquivo}.xlsx`);
  }
}
