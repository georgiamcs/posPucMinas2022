export function converterUndefinedEmNulo(valor: any): any {
  return valor == undefined ? null : valor;
}

export function converterUndefinedNuloEmFalse(
  valor: boolean | undefined | null
): boolean {
  return valor == undefined || valor == null ? false : valor;
}
