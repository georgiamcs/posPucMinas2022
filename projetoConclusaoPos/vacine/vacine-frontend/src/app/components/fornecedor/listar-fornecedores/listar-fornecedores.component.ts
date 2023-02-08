import { FornecedorService } from './../../../services/fornecedor/fornecedor.service';
import { Component } from '@angular/core';

import { Fornecedor } from './../../../shared/models/fornecedor.model';
import { ListarRegistrosComponent } from '../../lib/listar-registros/listar-registros.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-listar-fornecedores',
  templateUrl: './listar-fornecedores.component.html',
  styleUrls: ['./listar-fornecedores.component.scss'],
})
export class ListarFornecedoresComponent extends ListarRegistrosComponent<Fornecedor> {
  constructor(private router: Router, private service: FornecedorService) {
    super();
    this.colunasExibidas = [
      'nome',
      'cnpj',
      'email',
      'tel_celular',
      'tel_fixo',
      'acoes',
    ];
    this.carregarMensagensAoIniciar(this.router);
  }

  ngOnInit(): void {
    this.carregarFornecedores();
  }

  carregarFornecedores() {
    this.service.listar().subscribe((listaFornecedores) => {
      this.registros = listaFornecedores;
    });
  }
}
