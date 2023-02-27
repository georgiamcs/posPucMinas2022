import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';
import {
  AbstractControlOptions,
  FormBuilder, Validators
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogoConfirmacaoComponent } from 'src/app/components/dialogo-confirmacao/dialogo-confirmacao.component';
import { GenericPageFormComponent } from 'src/app/components/generic-page-form/generic-page-form.component';
import { SecurityProvider } from 'src/app/providers/security.provider';
import { UtilRota } from 'src/app/shared/utils/rota.util';
import { Util } from 'src/app/shared/utils/util.util';
import { ValidatorsUtil } from 'src/app/shared/utils/validators-util.util';
import { UtilValidators } from 'src/app/validators/util-validators';
import { ClienteService } from '../../../services/crud/cliente/cliente.service';
import { MensagemFeedback } from '../../../shared/classes/mensagem-feedback.class';
import { TipoMensagemFeedback } from '../../../shared/enums/tipo-mensagem-feedback.enum';
import { UsuarioTrocaSenha } from '../../../shared/models/usuario-troca-senha.model';

@Component({
  selector: 'vacine-trocar-senha',
  templateUrl: './trocar-senha.component.html',
  styleUrls: ['./trocar-senha.component.scss'],
})
export class TrocarSenhaComponent extends GenericPageFormComponent {
  protected readonly ROTULO_BOTAO_ACEITAR = 'Sim';
  protected readonly ROTULO_BOTAO_REJEITAR = 'Cancelar';

  private registro: UsuarioTrocaSenha;
  private id?: string;
  protected nomeUsuario?: string;

  constructor(
    protected override changeDetectorRef: ChangeDetectorRef,
    protected override media: MediaMatcher,
    protected override router: Router,
    protected override formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,

    private serviceCliente: ClienteService,
    private securityProvider: SecurityProvider,
    public dialogoConf: MatDialog
  ) {
    super(changeDetectorRef, media, router, formBuilder);
    this.id = Util.converterUndefinedEmNulo(
      this.activatedRoute.snapshot.paramMap.get('id')
    );
    this.preencherNomeUsuario();
  }

  private preencherNomeUsuario() {
    this.subscription = this.serviceCliente.getNome(this.id!).subscribe({
      next: (nome) => (this.nomeUsuario = nome),
      error: (e) =>
        this.tratarErro(
          `Não foi possível recuperar os dados do usuário. Erro => ${e.message}`
        ),
    });
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.buildForm();
  }

  protected buildForm() {
    this.form = this.formBuilder.group(
      {
        email: [{ value: '' }, Validators.required],
        senha: [
          null,
          Validators.compose([
            ValidatorsUtil.getValidadorObrigatorioSemEspacos(),
            Validators.minLength(5),
            Validators.maxLength(20),
          ]),
        ],
        confSenha: [
          null,
          Validators.compose([
            ValidatorsUtil.getValidadorObrigatorioSemEspacos(),
            Validators.minLength(5),
            Validators.maxLength(20),
          ]),
        ],
      },
      {
        validator: UtilValidators.confirmaSenhaValidator,
      } as AbstractControlOptions
    );
  }

  protected habilitarBotaoAcao(): boolean {
    return this.form.valid;
  }

  protected confirmarAlteracao() {
    if (this.id) {
      const dataModal = {
        data: {
          tituloModal: 'Alteração de senha',
          pergunta: 'Confirma a alteração da senha?',
          rotuloAceitar: this.ROTULO_BOTAO_ACEITAR,
          rotuloRejeitar: this.ROTULO_BOTAO_REJEITAR,
        },
      };

      const modalRef = this.dialogoConf.open(
        DialogoConfirmacaoComponent,
        dataModal
      );

      this.subscription = modalRef.afterClosed().subscribe({
        next: (result) => {
          if (result == this.ROTULO_BOTAO_ACEITAR) {
            this.trocarSenha();
          }
        },
        error: (erro) =>
          this.tratarErro(
            `Erro ao fechar janela de confirmação de exclusão: ${erro}`
          ),
      });
    }
  }

  protected trocarSenha() {
    let state = {};

    this.subscription = this.serviceCliente
      .trocarSenha(this.id, this.form.value)
      .subscribe({
        next: () => {
          const msgFeedbackSucesso = new MensagemFeedback(
            TipoMensagemFeedback.SUCESSO,
            'Senha alterada com sucesso!'
          );
          state = UtilRota.gerarStateMsgFeedbackRota(msgFeedbackSucesso);
          this.voltarParaJanelaAnterior(state);
        },
        error: (erro) =>
          this.tratarErro(`Não foi possível alterar a senha. Erro: ${erro}`),
      });
  }

  private voltarParaJanelaAnterior(state: Object) {
    let urlRet =
      this.router.url.indexOf('trocar_minha_senha') > -1
        ? '/home'
        : '/usuarios';
    this.router.navigate([urlRet], state);
  }

  protected fechar() {
    this.voltarParaJanelaAnterior({});
  }
}
