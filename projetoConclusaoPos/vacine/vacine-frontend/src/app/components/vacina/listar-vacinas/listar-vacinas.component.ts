import { VacinaService } from '../../../services/vacina/vacina.service';
import { Component, ViewChild } from '@angular/core';
import { Vacina } from 'src/app/shared/models/vacina.model';

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
      console.log('listaVacinas:', listaVacinas);
    });
  }

  excluirVacina(vacina: Vacina) {

  }

  confirmaExclusao(idVacina: String) {
  }

  rejeitaExclusao() {

  }
}
