import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { TipoMensagemFeedback } from '../shared/enums/tipo-mensagem-feedback.enum';
import { ControleAcessoService } from './../services/autenticacao/controle-acesso/controle-acesso.service';

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
      this.router.navigate(['login'], {
        state: {
          alerta: {
            tipo: TipoMensagemFeedback.ERRO,
            texto: 'Usuário não está logado. Efetue o login!',
          },
        },
      });
      return false;
    } else if (!this.servicoAcesso.verificaExistePerfil(route.data['perfis'])) {
      this.router.navigate(['home'], {
        state: {
          alerta: {
            tipo: TipoMensagemFeedback.ERRO,
            texto: 'Acesso negado.',
          },
        },
      });
      return false;
    }
    return true;
  }
}
