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

  public static getDataHoraAtualFormatAnoMesDiaHoraMinutoSegundo(): string {
    const dataAtual = new Date();
    const ano = dataAtual.getFullYear().toString();
    const mes = (dataAtual.getMonth() + 1).toString().padStart(2, '0');
    const dia = dataAtual.getDate().toString().padStart(2, '0');
    const hora = dataAtual.getHours().toString().padStart(2, '0');
    const minuto = dataAtual.getMinutes().toString().padStart(2, '0');
    const segundo = dataAtual.getSeconds().toString().padStart(2, '0');
    const dataFormatada = `${ano}${mes}${dia}${hora}${minuto}${segundo}`;

    return dataFormatada;
  }
}
