import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ListarRegistrosComponent } from 'src/app/components/listar-registros/listar-registros.component';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Usuario } from 'src/app/shared/models/usuario.model';

@Component({
  selector: 'vacine-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.scss'],
})
export class ListarUsuariosComponent extends ListarRegistrosComponent<Usuario> {
  constructor(private _router: Router, private _service: UsuarioService) {
    super();
    this.colunasExibidas = ['nome', 'cpf', 'email', 'tel_celular', 'acoes'];
    this.definirAtributosInjetores();
    this.carregarMensagensAoIniciar();
  }

  private definirAtributosInjetores() {
    this.service = this._service;
    this.router = this._router;
  }
}