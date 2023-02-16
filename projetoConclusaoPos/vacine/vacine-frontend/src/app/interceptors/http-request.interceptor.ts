import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TipoMensagemFeedback } from 'src/app/shared/enums/tipo-mensagem-feedback.enum';
import { SecurityProvider } from './../providers/security.provider';
import { RetornoHttp } from './../shared/enums/retorno-http.enum';

import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { gerarStateAlertaRota } from '../shared/utils/util.util';
import { MensagemFeedback } from '../shared/classes/mensagem-feedback.class';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(
    private securityProvider: SecurityProvider,
    private router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.securityProvider.getToken();
    let requisicao = req;
    if (token) {
      requisicao = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token),
      });
    }
    return next.handle(requisicao).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === RetornoHttp.HTTP_UNKNOW) {
            return throwError(
              () => new Error(`Erro de conexão com o servidor ${error.url}`)
            );
          } else if (!req.url.includes('api/login')) {
            if (error.status === RetornoHttp.HTTP_UNAUTHORIZED) {
              this.securityProvider.removeTokenUsuario();
              this.router.navigate(
                ['/login'],
                gerarStateAlertaRota(
                  new MensagemFeedback(
                    TipoMensagemFeedback.ERRO,
                    'Para ter acesso a essa funcionalidade é preciso efetuar o login!'
                  )
                )
              );
              // throw new Error(
              //   'Para ter acesso a essa funcionalidade é preciso efetuar o login'
              // );
            } else if (error.status === RetornoHttp.HTTP_FORBIDEN) {
              this.router.navigate(
                ['/home'],
                gerarStateAlertaRota(
                  new MensagemFeedback(
                    TipoMensagemFeedback.ERRO,
                    'Usuário sem permissão para acessar essa funcionalidade'
                  )
                )
              );
              throw new Error(
                'Usuário sem permissão para acessar essa funcionalidade'
              );
            } else { // erro http nao tratado, melhorar mensagem de retorno
              console.error('Erro', error);
              return throwError(
                () => `Mensagem: ${error.message} Erro: ${error.error.error}`
              );
            }
          }
        }
        console.error('Erro', error);
        return throwError(() => error);
      })
    );
  }
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];
