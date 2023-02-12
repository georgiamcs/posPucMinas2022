import { ControleAcessoService } from './../../services/autenticacao/controle-acesso/controle-acesso.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MensagemFeedback } from 'src/app/shared/classes/mensagem-feedback.class';

@Component({
  selector: 'vacine-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

  protected mensagens: MensagemFeedback[] = [];

  constructor(private router: Router, protected servicoAcesso: ControleAcessoService) {
    let alerta = this.router.getCurrentNavigation()?.extras.state?.['alerta'];
    if (alerta) {
      this.mensagens.push(alerta);
    }
  }
}
