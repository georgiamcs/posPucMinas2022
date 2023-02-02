//TODO: Verificar porque nao esta funcionando mostrar o tipo da idade recomendada na listagem
//TODO: Verificar como usar no routerLink o tipo da rota = usar funcao no ts para retornar?
import { Component } from '@angular/core';

import { Vacina } from 'src/app/shared/models/vacina.model';
import { VacinaService } from '../../../services/vacina/vacina.service';

@Component({
  selector: 'app-listar-vacinas',
  templateUrl: './listar-vacinas.component.html',
  styleUrls: ['./listar-vacinas.component.scss'],
})
export class ListarVacinasComponent {
  vacinas: Vacina[] = [];

  displayedColumns: string[] = [
    'nome',
    'protecaoContra',
    'vlIdadeRecomemendada',
    'acoes',
  ];

  constructor(private vacinaService: VacinaService) {}

  ngOnInit(): void {
    this.carregarVacinas();
  }

  carregarVacinas() {
    this.vacinaService.listar().subscribe((listaVacinas) => {
      this.vacinas = listaVacinas;
    });
  }
}
