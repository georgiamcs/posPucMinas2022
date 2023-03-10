import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { GenericPageComponent } from 'src/app/components/generic-page/generic-page.component';
import { SecurityProvider } from 'src/app/providers/security.provider';
import { ControleAcessoService } from 'src/app/services/authentication/controle-acesso/controle-acesso.service';
import { UsuarioService } from 'src/app/services/crud/usuario/usuario.service';
import { MensagemFeedback } from 'src/app/shared/classes/mensagem-feedback.class';
import { TipoMensagemFeedback } from 'src/app/shared/enums/tipo-mensagem-feedback.enum';
import { Util } from 'src/app/shared/utils/util.util';
import {
  Acesso,
  TemaAcessoUsuario,
  TipoAcessoUsuario
} from './../../../shared/classes/acesso.class';

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
    private service: UsuarioService
  ) {
    super(changeDetectorRef, media, router, serviceAcesso);
  }

  protected getTemaAcesso(): TemaAcessoUsuario {
    throw new Error('Página "Container" não tem checagem de acesso.');
  }

  protected trocarSenha() {
    this.idUser = this.securityProvider.getUsuario()?._id;
    const link = `/trocar_minha_senha/${this.idUser}`;
    this.irParaPagina(link);
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
    return Acesso.getDescricaoPerfil(
      this.serviceAcesso.getUsuario()?.perfil_acesso
    );
  }

  protected async downloadMinhasVacinacoes() {
    this.deleteAllMensagens();
    let dados = [];
    const idCliente = this.securityProvider.getUsuario()?._id;
    const dataFormatada = Util.getDataHoraAtualFormatAnoMesDiaHoraMinutoSegundo();
    const nomeCliente = this.securityProvider.getUsuario()?.nome;
    const primeiroNomeCliente = nomeCliente?.split(' ')[0];
    const nomeArquivo = `${dataFormatada}-Vacinacoes-${primeiroNomeCliente}`;

    await this.service.getVacinacoes(idCliente).subscribe({
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
          Util.exportToExcel(dados, 'Vacinações', nomeArquivo);
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
