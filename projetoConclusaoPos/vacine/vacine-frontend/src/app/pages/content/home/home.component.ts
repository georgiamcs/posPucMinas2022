import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { GenericPageComponent } from 'src/app/components/generic-page/generic-page.component';
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
    protected servicoAcesso: ControleAcessoService
  ) {
    super(changeDetectorRef, media, router);
  }
}
