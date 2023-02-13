import { Usuario } from './../../../../shared/models/usuario.model';
import { UsuarioTrocaSenha } from './../../../../shared/models/usuario-troca-senha.model';
import { ClienteService } from './../../../../shared/services/cliente/cliente.service';
import { TipoMensagemFeedback } from './../../../../shared/enums/tipo-mensagem-feedback.enum';
import { MensagemFeedback } from './../../../../shared/classes/mensagem-feedback.class';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericPageComponent } from './../../../../components/generic-page/generic-page.component';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { ModoFormulario } from 'src/app/shared/enums/modo-formulario.enum';

@Component({
  selector: 'vacine-trocar-senha',
  templateUrl: './trocar-senha.component.html',
  styleUrls: ['./trocar-senha.component.scss'],
})
export class TrocarSenhaComponent extends GenericPageComponent {
  form!: FormGroup;
  registro: UsuarioTrocaSenha;
  usuario: Usuario;
  cpf?: string;

  constructor(
    private _router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private serviceUsuario: UsuarioService,
    private serviceCliente: ClienteService
  ) {
    super();
    this.router = this._router;
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.carregarDadosId();

    if (!!this.cpf) {
      this.buildForm();
    } else {
      this.addMensagem(
        new MensagemFeedback(
          TipoMensagemFeedback.ERRO,
          'Troca de senha não pode ser realizada porque o CPF do usuário não está cadastrado'
        )
      );
    }
  }

  protected buildForm() {
    this.form = this.formBuilder.group({
      email: [{ value: '' }, Validators.required],
      cpf: [{ value: '' }, Validators.required],
      senha: [{ value: '' }, Validators.required],
    });
  }

  protected carregarDadosId() {
    this.registro._id = this.activatedRoute.snapshot.paramMap.get('id');

    if (this.registro._id) {
      this.subscription = this.serviceUsuario
        .procurarPorId(this.registro._id)
        .subscribe({
          next: (regBusca) => (this.cpf = regBusca.cpf),
          error: (erro) =>
            this.tratarErro(
              `Erro ao recuperar informaçoes do usuário: ${erro}`,
              false
            ),
        });
    }
  }

  protected confirmaCpfUsuario(): boolean {
    return this.form.value.cpf == this.cpf;
  }

  protected trocarSenha() {
    const msgFeedbackSucesso = new MensagemFeedback(
      TipoMensagemFeedback.SUCESSO,
      'Senha alterada com sucesso!'
    );

    this.subscription = this.serviceCliente
      .trocarSenha(this.form.value)
      .subscribe({
        next: () => this.addMensagem(msgFeedbackSucesso),
        error: (erro) =>
          this.tratarErro(`Não foi possível alterar a senha. Erro: ${erro}`),
      });
  }
}
