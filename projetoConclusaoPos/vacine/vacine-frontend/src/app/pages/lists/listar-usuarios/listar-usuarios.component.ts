import { CpfPipe } from './../../../shared/pipes/cpf/cpf.pipe';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { GenericListarRegistrosComponent } from 'src/app/components/generic-listar-registros/generic-listar-registros.component';
import { UsuarioService } from 'src/app/services/crud/usuario/usuario.service';
import { DefinicaoColunasExibidas } from 'src/app/shared/interfaces/defincao-colunas-exibidas.interface';
import { Usuario } from 'src/app/shared/models/usuario.model';
import { TelefonePipe } from 'src/app/shared/pipes/telefone/telefone.pipe';

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
  }

  protected getTituloPagina(): string {
    return 'Usuários';
  }
  protected getRegistrosExportar(): any[] {
    let ret = this.registros.map((r) => {
      return {
        Nome: r.nome,
        CPF: new CpfPipe().transform(r.cpf),
        Email: r.email,
        TelefoneCelular: new TelefonePipe().transform(r.tel_celular),
      };
    });
    return ret;
  }
  protected getPathCrudUrl(): string | null {
    return 'usuario';
  }
  protected getDefColunasExibidas(): DefinicaoColunasExibidas[] {
    return [
      { def: 'nome' },
      { def: 'cpf' },
      { def: 'email', showMobile: false },
      { def: 'tel_celular', showMobile: false },
      { def: 'acoes' },
    ];
  }

}
