import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { GenericPageComponent } from 'src/app/components/generic-page/generic-page.component';
import { ControleAcessoService } from '../../../services/authentication/controle-acesso/controle-acesso.service';

@Component({
  selector: 'vacine-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent extends GenericPageComponent {
  constructor(
    private _router: Router,
    private __deviceService: DeviceDetectorService,
    protected servicoAcesso: ControleAcessoService
  ) {
    super(_router, __deviceService);
  }
}
