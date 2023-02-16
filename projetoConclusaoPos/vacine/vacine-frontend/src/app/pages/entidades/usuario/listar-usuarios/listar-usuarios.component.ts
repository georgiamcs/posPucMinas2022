import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ListarRegistrosComponent } from 'src/app/components/listar-registros/listar-registros.component';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Usuario } from 'src/app/shared/models/usuario.model';

@Component({
  selector: 'vacine-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.scss'],
})
export class ListarUsuariosComponent extends ListarRegistrosComponent<Usuario> {
  constructor(
    private _router: Router,
    private _service: UsuarioService,
    private __deviceService: DeviceDetectorService
  ) {
    super(__deviceService);
    this.definirColunasExibidas();
    this.definirAtributosInjetores();
    this.carregarMensagensAoIniciar();
  }

  protected definirColunasExibidas() {
    this.defColunasExibidas = [
      { def: 'nome', showMobile: true, showDesktop: true, showTablet: true },
      {
        def: 'cpf',
        showMobile: true,
        showDesktop: true,
        showTablet: true,
      },
      {
        def: 'email',
        showMobile: false,
        showDesktop: true,
        showTablet: true,
      },
      {
        def: 'tel_celular',
        showMobile: false,
        showDesktop: true,
        showTablet: true,
      },
      { def: 'acoes', showMobile: true, showDesktop: true, showTablet: true },
    ];
  }

  private definirAtributosInjetores() {
    this.service = this._service;
    this.router = this._router;
  }
}
