import {
  Acesso,
  TemaAcessoUsuario,
  TipoAcessoUsuario,
} from './../../../shared/classes/acesso.class';
import { MediaMatcher } from '@angular/cdk/layout';
import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { GenericPageComponent } from 'src/app/components/generic-page/generic-page.component';
import { SecurityProvider } from 'src/app/providers/security.provider';
import { ControleAcessoService } from 'src/app/services/authentication/controle-acesso/controle-acesso.service';
import { ClienteService } from 'src/app/services/crud/cliente/cliente.service';
import { MensagemFeedback } from 'src/app/shared/classes/mensagem-feedback.class';
import { TipoMensagemFeedback } from 'src/app/shared/enums/tipo-mensagem-feedback.enum';
import { Util } from 'src/app/shared/utils/util.util';

@Component({
  selector: 'vacine-site-container',
  templateUrl: './site-container.component.html',
  styleUrls: ['./site-container.component.scss'],
})
export class PageContainerComponent
  extends GenericPageComponent
  implements OnDestroy
{
  private idUser: string | null | undefined;
  constructor(
    protected override changeDetectorRef: ChangeDetectorRef,
    protected override media: MediaMatcher,
    protected override router: Router,
    protected override serviceAcesso: ControleAcessoService,
    protected servicoAcesso: ControleAcessoService,
    protected securityProvider: SecurityProvider,
    private clienteService: ClienteService
  ) {
    super(changeDetectorRef, media, router, serviceAcesso);
  }

  protected getTemaAcesso(): TemaAcessoUsuario {
    throw new Error('Página "Container" não tem checagem de acesso.');
  }

  protected trocarSenha() {
    this.idUser = this.securityProvider.getUsuario()?._id;
    const link = `/trocar_minha_senha/${this.idUser}`;
    this.router.navigate([link]);
  }

  protected podeAcessarMenuUsuario(): boolean {
    return this.servicoAcesso.verificaExistePerfil(TemaAcessoUsuario.USUARIO, [
      TipoAcessoUsuario.VISUALIZAR_TODOS,
    ]);
  }

  protected podeAcessarMenuVacina(): boolean {
    return this.servicoAcesso.verificaExistePerfil(TemaAcessoUsuario.VACINA, [
      TipoAcessoUsuario.VISUALIZAR_TODOS,
    ]);
  }

  protected podeAcessarMenuVacinacao(): boolean {
    return this.servicoAcesso.verificaExistePerfil(
      TemaAcessoUsuario.VACINACAO,
      [TipoAcessoUsuario.VISUALIZAR_TODOS]
    );
  }

  protected podeAcessarMenuDescarteVacina(): boolean {
    return this.servicoAcesso.verificaExistePerfil(
      TemaAcessoUsuario.DESCARTE_VACINA,
      [TipoAcessoUsuario.VISUALIZAR_TODOS]
    );
  }

  protected podeAcessarMenuFornecedorVacina(): boolean {
    return this.servicoAcesso.verificaExistePerfil(
      TemaAcessoUsuario.FORNECEDOR_VACINA,
      [TipoAcessoUsuario.VISUALIZAR_TODOS]
    );
  }

  protected podeAcessarMenuCompraVacina(): boolean {
    return this.servicoAcesso.verificaExistePerfil(
      TemaAcessoUsuario.COMPRA_VACINA,
      [TipoAcessoUsuario.VISUALIZAR_TODOS]
    );
  }

  protected podeAcessarMenuGraficos(): boolean {
    return this.servicoAcesso.verificaExistePerfil(
      TemaAcessoUsuario.INDICADORES,
      [TipoAcessoUsuario.VISUALIZAR_TODOS]
    );
  }

  protected podeAcessarMenuMinhasVacinacoes(): boolean {
    return this.servicoAcesso.verificaExistePerfil(
      TemaAcessoUsuario.VACINACAO,
      [TipoAcessoUsuario.VISUALIZAR_PROPRIO]
    );
  }

  protected getDescricaoPerfil(): string {
    return Acesso.getDescricaoPerfil(this.serviceAcesso.getUsuario()?.perfil_acesso);
  }

  protected async downloadMinhasVacinacoes() {
    let dados = [];
    const idCliente = this.securityProvider.getUsuario()?._id;

    await this.clienteService.getVacinacoes(idCliente).subscribe({
      next: (r) => {
        dados = r.flatMap((v) => {
          return v.itens_vacinacao.map((item) => {
            return {
              'Data de Aplicação': new Date(
                v.data_aplicacao + ''
              ).toLocaleDateString('pt-BR'),
              Código: v.codigo,
              Vacina: item.vacina.nome,
              Lote: item.lote,
              Validade: new Date(item.data_validade + '').toLocaleDateString(
                'pt-BR'
              ),
              Valor: item.vl_item,
            };
          });
        });

        if (dados.length > 0) {
          Util.exportToExcel(dados, 'VacinacoesUsuario', 'VacinacoesUsuario');
          const msgFeedback = new MensagemFeedback(
            TipoMensagemFeedback.SUCESSO,
            'Arquivo gerado com sucesso.'
          );
          this.addMensagem(msgFeedback);
        } else {
          const msgFeedback = new MensagemFeedback(
            TipoMensagemFeedback.INFORMACAO,
            'Não existem vacinações registradas para o usuário.'
          );
          this.addMensagem(msgFeedback);
        }
      },
      error: (erro) => {
        this.tratarErro(
          `Erro ao recuperar as vacinações do usuário => ${erro.message}`
        );
      },
    });
  }
}
