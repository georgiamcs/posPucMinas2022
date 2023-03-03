import { throwError } from 'rxjs';
import { ListaSelect } from '../interfaces/lista-select.interface';

export enum MotivoDescarteVacina {
  EXPIRACAO = 'E',
  ARMAZENAMENTO = 'A',
  CONTAMINACAO = 'C',
  DANO_FISICO = 'F',
  USO_IMPROPRIO = 'U',
  DESPERDICIO = 'D',
  RECUSA_PACIENTE = 'R',
  OUTRO = 'O',
}

export const MOTIVOS_DESCARTES_VACINAS: ListaSelect[] = [
  {
    valor: MotivoDescarteVacina.ARMAZENAMENTO,
    valorExibicao: 'Armazenamento',
  },
  {
    valor: MotivoDescarteVacina.CONTAMINACAO,
    valorExibicao: 'Contaminação',
  },
  {
    valor: MotivoDescarteVacina.DANO_FISICO,
    valorExibicao: 'Dano físico',
  },
  {
    valor: MotivoDescarteVacina.DESPERDICIO,
    valorExibicao: 'Desperdício',
  },
  {
    valor: MotivoDescarteVacina.EXPIRACAO,
    valorExibicao: 'Expiração',
  },
  {
    valor: MotivoDescarteVacina.RECUSA_PACIENTE,
    valorExibicao: 'Recusa paciente',
  },
  {
    valor: MotivoDescarteVacina.USO_IMPROPRIO,
    valorExibicao: 'Uso impróprio',
  },
  {
    valor: MotivoDescarteVacina.OUTRO,
    valorExibicao: 'Outro',
  },
];

export function getDescMotivoDescarteVacina(mot: string): string {
  let ret = '';
  switch (mot) {
    case MotivoDescarteVacina.EXPIRACAO:
      ret = 'Expiração';
      break;

    case MotivoDescarteVacina.ARMAZENAMENTO:
      ret = 'Armazenamento';
      break;

    case MotivoDescarteVacina.CONTAMINACAO:
      ret = 'Contaminação';
      break;

    case MotivoDescarteVacina.DANO_FISICO:
      ret = 'Dano físico';
      break;

    case MotivoDescarteVacina.USO_IMPROPRIO:
      ret = 'Uso impróprio';
      break;

    case MotivoDescarteVacina.DESPERDICIO:
      ret = 'Desperdício';
      break;

    case MotivoDescarteVacina.RECUSA_PACIENTE:
      ret = 'Recusa paciente';
      break;

    case MotivoDescarteVacina.OUTRO:
      ret = 'Outro';
      break;

    default:
      throw new Error(`Motivo de descarte inválido: ${mot}`);
  }

  return ret;
}
