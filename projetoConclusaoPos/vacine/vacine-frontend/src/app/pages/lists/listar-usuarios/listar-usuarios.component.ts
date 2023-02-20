import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { GenericListarRegistrosComponent } from 'src/app/components/generic-listar-registros/generic-listar-registros.component';
import { UsuarioService } from 'src/app/services/crud/usuario/usuario.service';
import { Usuario } from 'src/app/shared/models/usuario.model';

@Component({
  selector: 'vacine-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.scss'],
})
export class ListarUsuariosComponent extends GenericListarRegistrosComponent<Usuario> {
  constructor(
    private __router: Router,
    private __deviceService: DeviceDetectorService,
    private _service: UsuarioService
  ) {
    super(__router, __deviceService, _service);
    this.definirColunasExibidas();
    this.definirAtributosSuperClasse();
  }

  protected definirColunasExibidas() {
    this.defColunasExibidas = [
      { def: 'nome' },
      { def: 'cpf' },
      { def: 'email', showMobile: false },
      { def: 'tel_celular', showMobile: false },
      { def: 'acoes' },
    ];
  }

  private definirAtributosSuperClasse() {
    this.pathCrudUrl = 'usuario';
  }
}
