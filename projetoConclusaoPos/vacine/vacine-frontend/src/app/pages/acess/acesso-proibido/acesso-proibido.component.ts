import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { GenericPageComponent } from 'src/app/components/generic-page/generic-page.component';
import { ControleAcessoService } from 'src/app/services/authentication/controle-acesso/controle-acesso.service';
import { TemaAcessoUsuario } from 'src/app/shared/classes/acesso.class';

@Component({
  selector: 'vacine-acesso-proibido',
  templateUrl: './acesso-proibido.component.html',
  styleUrls: ['./acesso-proibido.component.scss'],
})
export class AcessoProibidoComponent extends GenericPageComponent {
  constructor(
    protected override changeDetectorRef: ChangeDetectorRef,
    protected override media: MediaMatcher,
    protected override router: Router,
    protected override serviceAcesso: ControleAcessoService
  ) {
    super(changeDetectorRef, media, router, serviceAcesso);
  }

  protected getTemaAcesso(): TemaAcessoUsuario {
    throw new Error('Página "Acesso proibido" não tem checagem de acesso.');
  }
}
