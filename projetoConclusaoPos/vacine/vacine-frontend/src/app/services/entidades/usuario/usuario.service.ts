import { GenericCrudService } from '../../generic/generic-crud/generic-crud.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Usuario } from 'src/app/shared/models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService extends GenericCrudService<Usuario> {

  constructor(private _http: HttpClient) {
    super();
    this.http = _http;
    this.relativeApiURL = 'usuarios';
  }
}
