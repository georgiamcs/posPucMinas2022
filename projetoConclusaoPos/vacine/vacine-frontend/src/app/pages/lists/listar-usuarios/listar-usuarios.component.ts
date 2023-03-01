import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { GenericListarRegistrosComponent } from 'src/app/components/generic-listar-registros/generic-listar-registros.component';
import { UsuarioService } from 'src/app/services/crud/usuario/usuario.service';
import { DefinicaoColunasExibidas } from 'src/app/shared/interfaces/defincao-colunas-exibidas.interface';
import { Usuario } from 'src/app/shared/models/usuario.model';
import { TelefonePipe } from 'src/app/shared/pipes/telefone/telefone.pipe';
import { Util } from 'src/app/shared/utils/util.util';
import { ClienteService } from './../../../services/crud/cliente/cliente.service';
import { MensagemFeedback } from './../../../shared/classes/mensagem-feedback.class';
import { TipoMensagemFeedback } from './../../../shared/enums/tipo-mensagem-feedback.enum';
import { CpfPipe } from './../../../shared/pipes/cpf/cpf.pipe';

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
    protected override service: UsuarioService,
    private clienteService: ClienteService
  ) {
    super(changeDetectorRef, media, router, service);
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
  protected getPathCrudUrl(): string | null {
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
      },
      { def: 'tel_celular', showMobileResolution: false },
      { def: 'acoes' },
    ];
  }

  protected async exportarVacinacao(idCliente: string) {
    let dados = [];
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
      error: (err) => {
        throw err;
      },
    });
  }
}
