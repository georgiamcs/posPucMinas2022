export class DominioCodigoRotulo {
  codigo: any;
  nome: string;
}

export type TipoMapa<T extends string> = {
  [tipo in T]: string;
};

export function mapearDominio<T extends string>(
  mapa: TipoMapa<T>
): DominioCodigoRotulo[] {
  return Object.keys(mapa).map((key) => {
    return { codigo: key, nome: mapa[key as T] } as DominioCodigoRotulo;
  });
}

export function gerarId(fixed: string, item: DominioCodigoRotulo): string {
  return `${fixed}-${item.codigo}`;
}
