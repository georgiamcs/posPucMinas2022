import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { GenericListarRegistrosComponent } from 'src/app/components/generic-listar-registros/generic-listar-registros.component';
import { UsuarioService } from 'src/app/services/crud/usuario/usuario.service';
import { DefinicaoColunasExibidas } from 'src/app/shared/interfaces/defincao-colunas-exibidas.interface';
import { Usuario } from 'src/app/shared/classes/usuario.class';
import { TelefonePipe } from 'src/app/shared/pipes/telefone/telefone.pipe';
import { Util } from 'src/app/shared/utils/util.util';
import { MensagemFeedback } from './../../../shared/classes/mensagem-feedback.class';
import { TipoMensagemFeedback } from './../../../shared/enums/tipo-mensagem-feedback.enum';
import { CpfPipe } from './../../../shared/pipes/cpf/cpf.pipe';
import { ControleAcessoService } from 'src/app/services/authentication/controle-acesso/controle-acesso.service';
import { TemaAcessoUsuario } from 'src/app/shared/classes/acesso.class';

@Component({
  selector: 'vacine-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.scss'],
})
export class ListarUsuariosComponent extends GenericListarRegistrosComponent<Usuario> {
  constructor(
    protected override changeDetectorRef: ChangeDetectorRef,
    protected override media: MediaMatcher,
    protected override router: Router,
    protected override serviceAcesso: ControleAcessoService,
    protected override service: UsuarioService
  ) {
    super(changeDetectorRef, media, router, serviceAcesso, service);
  }

  protected getTemaAcesso(): TemaAcessoUsuario {
    return TemaAcessoUsuario.USUARIO;
  }

  protected getTituloPagina(): string {
    return 'Usuários';
  }
  protected getRegistrosExportar(): any[] {
    let ret = this.registros.map((r) => {
      return {
        Nome: r.nome,
        CPF: new CpfPipe().transform(r.cpf),
        Email: r.email,
        TelefoneCelular: new TelefonePipe().transform(r.tel_celular),
      };
    });
    return ret;
  }
  protected getPathCrudUrl(): string {
    return 'usuario';
  }
  protected getDefColunasExibidas(): DefinicaoColunasExibidas[] {
    return [
      { def: 'nome' },
      {
        def: 'cpf',
        showMobileResolution: false,
        showTabletLowResolution: false,
        showTabletHighResolution: false,
      },
      {
        def: 'email',
        showMobileResolution: false,
        showTabletLowResolution: false,
        showTabletHighResolution: false,
      },
      {
        def: 'tel_celular',
        showMobileResolution: false,
        showTabletLowResolution: false,
      },
      { def: 'acoes' },
    ];
  }

  protected async exportarVacinacao(idCliente: string, nomeCliente: string) {
    let dados = [];

    const dataFormatada =Util.getDataHoraAtualFormatAnoMesDiaHoraMinutoSegundo();
    const primeiroNomeCliente = nomeCliente?.split(' ')[0];
    const nomeArquivo = `${dataFormatada}-Vacinacoes-${primeiroNomeCliente}`;

    this.deleteAllMensagens();

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
      error: (err) => {
        throw err;
      },
    });
  }
}
