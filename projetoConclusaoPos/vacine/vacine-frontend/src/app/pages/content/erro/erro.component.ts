import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { GenericPageComponent } from 'src/app/components/generic-page/generic-page.component';

@Component({
  selector: 'vacine-erro',
  templateUrl: './erro.component.html',
  styleUrls: ['./erro.component.scss'],
})
export class ErroComponent extends GenericPageComponent {
  constructor(
    private _router: Router,
    private __deviceService: DeviceDetectorService
  ) {
    super(_router, __deviceService);
  }
}
