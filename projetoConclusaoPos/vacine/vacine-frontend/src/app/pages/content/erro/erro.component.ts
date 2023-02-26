import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { GenericPageComponent } from 'src/app/components/generic-page/generic-page.component';

@Component({
  selector: 'vacine-erro',
  templateUrl: './erro.component.html',
  styleUrls: ['./erro.component.scss'],
})
export class ErroComponent extends GenericPageComponent {
  constructor(
    protected override changeDetectorRef: ChangeDetectorRef,
    protected override media: MediaMatcher,
    protected override router: Router
  ) {
    super(changeDetectorRef, media, router);
  }
}
