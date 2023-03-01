import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { GenericPageComponent } from 'src/app/components/generic-page/generic-page.component';

@Component({
  selector: 'vacine-acesso-proibido',
  templateUrl: './acesso-proibido.component.html',
  styleUrls: ['./acesso-proibido.component.scss']
})
export class AcessoProibidoComponent extends GenericPageComponent {
  constructor(
    protected override changeDetectorRef: ChangeDetectorRef,
    protected override media: MediaMatcher,
    protected override router: Router
  ) {
    super(changeDetectorRef, media, router);
  }
}
