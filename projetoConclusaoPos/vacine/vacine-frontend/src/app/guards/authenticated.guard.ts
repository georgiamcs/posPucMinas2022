import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { MensagemFeedback } from '../shared/classes/mensagem-feedback.class';
import { TipoMensagemFeedback } from '../shared/enums/tipo-mensagem-feedback.enum';
import { UtilRota } from '../shared/utils/rota.util';
import { ControleAcessoService } from './../services/authentication/controle-acesso/controle-acesso.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticatedGuard implements CanActivate {
  constructor(
    private router: Router,
    private servicoAcesso: ControleAcessoService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    if (!this.servicoAcesso.isLogado()) {
      this.router.navigate(
        ['login'],
        UtilRota.gerarStateMsgFeedbackRota(
          new MensagemFeedback(
            TipoMensagemFeedback.ERRO,
            'Usuário não está logado. Efetue o login!'
          )
        )
      );
      return false;
    } else if (
      !this.servicoAcesso.verificaExistePerfil(
        route.data['tema'],
        route.data['tipoAcesso']
      )
    ) {
      this.router.navigate(['acesso-proibido']);
      return false;
    }
    return true;
  }
}
