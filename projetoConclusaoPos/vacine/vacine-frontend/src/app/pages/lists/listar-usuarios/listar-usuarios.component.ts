import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { GenericListarRegistrosComponent } from 'src/app/components/generic-listar-registros/generic-listar-registros.component';
import { UsuarioService } from 'src/app/services/crud/usuario/usuario.service';
import { DefinicaoColunasExibidas } from 'src/app/shared/interfaces/defincao-colunas-exibidas.interface';
import { Usuario } from 'src/app/shared/models/usuario.model';
import { TelefonePipe } from 'src/app/shared/pipes/telefone/telefone.pipe';
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
      { def: 'cpf' },
      { def: 'email', showLowResolution: false },
      { def: 'tel_celular', showLowResolution: false },
      { def: 'acoes' },
    ];
  }

  protected exportarVacinacao(idCliente: string) {
    this.clienteService
      .getArquivoVacinaoUsuario(idCliente)
      .then(() => {
        const msgFeedbackSucesso = new MensagemFeedback(
          TipoMensagemFeedback.SUCESSO,
          'Arquivo gerado com sucesso'
        );
        this.addMensagem(msgFeedbackSucesso);
      })
      .catch((erro: Error) => {
        const msgFeedbackSucesso = new MensagemFeedback(
          TipoMensagemFeedback.ERRO,
          'Erro ao gerar arquivo'
        );
        this.addMensagem(msgFeedbackSucesso);
      });
  }
}
