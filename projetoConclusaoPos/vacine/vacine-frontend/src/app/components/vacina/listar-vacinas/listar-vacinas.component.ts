import { Router } from '@angular/router';
//TODO: Verificar como usar no routerLink o tipo da rota = usar funcao no ts para retornar?
import { Component } from '@angular/core';

import { Vacina } from 'src/app/shared/models/vacina.model';
import { VacinaService } from '../../../services/vacina/vacina.service';
import { ListarRegistrosComponent } from '../../../shared/components/listar-registros/listar-registros.component';

@Component({
  selector: 'vacine-listar-vacinas',
  templateUrl: './listar-vacinas.component.html',
  styleUrls: ['./listar-vacinas.component.scss'],
})
export class ListarVacinasComponent extends ListarRegistrosComponent<Vacina> {

  constructor(
    private router: Router,
    private vacinaService: VacinaService) {

    super();
    this.colunasExibidas = [
      'nome',
      'protecaoContra',
      'vlIdadeRecomemendada',
      'acoes',
    ];
    this.carregarMensagensAoIniciar(this.router);
  }

  ngOnInit(): void {
    this.carregarVacinas();
  }

  carregarVacinas() {
    this.vacinaService.listar().subscribe((listaVacinas) => {
      this.registros = listaVacinas;
    });
  }
}
