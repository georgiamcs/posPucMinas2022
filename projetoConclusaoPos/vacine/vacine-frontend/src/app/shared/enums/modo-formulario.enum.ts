import { TipoRota } from './tipo-rota.enum';

export enum ModoFormulario {
  INCLUSAO = 0,
  ALTERACAO = 1,
  CONSULTA = 2,
  EXCLUSAO = 3,
  REGISTRAR = 4,
}

export function getParteUrlModoFormulario(modoForm: ModoFormulario): string {
  switch (modoForm) {
    case ModoFormulario.ALTERACAO:
      return 'editar';
    case ModoFormulario.EXCLUSAO:
      return 'excluir';
    default:
      return '';
  }
}

export function definirLabelBotaoAcaoModoFormulario(
  modoForm: ModoFormulario
): string {
  let lbBotaoAcao: string = '';

  switch (modoForm) {
    case ModoFormulario.INCLUSAO:
      lbBotaoAcao = 'Incluir';
      break;
    case ModoFormulario.ALTERACAO:
      lbBotaoAcao = 'Alterar';
      break;
    case ModoFormulario.EXCLUSAO:
      lbBotaoAcao = 'Excluir';
      break;
  }

  return lbBotaoAcao;
}

export function definirLabelBotaoFecharModoFormulario(
  modoForm: ModoFormulario
): string {
  return ModoFormulario.CONSULTA ? 'Fechar' : 'Cancelar';
}

export function definirModoFormulario(
  id: string | null | undefined,
  url: string
): ModoFormulario {
  let modoForm: ModoFormulario;

  if (!id) {
    modoForm =
      url.indexOf(TipoRota.REGISTRAR) > -1
        ? ModoFormulario.REGISTRAR
        : ModoFormulario.INCLUSAO;
  } else {
    modoForm =
      url.indexOf(TipoRota.ALTERACAO) > -1
        ? ModoFormulario.ALTERACAO
        : url.indexOf(TipoRota.EXCLUSAO) > -1
        ? ModoFormulario.EXCLUSAO
        : ModoFormulario.CONSULTA;
  }

  return modoForm;
}
