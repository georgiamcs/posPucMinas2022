import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { GenericPageComponent } from 'src/app/components/generic-page/generic-page.component';
import { TemaAcessoUsuario } from 'src/app/shared/classes/acesso.class';
import { ControleAcessoService } from '../../../services/authentication/controle-acesso/controle-acesso.service';

@Component({
  selector: 'vacine-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent extends GenericPageComponent {
  constructor(
    protected override changeDetectorRef: ChangeDetectorRef,
    protected override media: MediaMatcher,
    protected override router: Router,
    protected override serviceAcesso: ControleAcessoService,
    protected servicoAcesso: ControleAcessoService
  ) {
    super(changeDetectorRef, media, router, serviceAcesso);
  }

  protected getTemaAcesso(): TemaAcessoUsuario {
    throw new Error('Página "Home" não tem checagem de acesso.');
  }
}
