import { Component } from '@angular/core';
import { Vacina } from 'src/app/shared/models/vacina.model';

@Component({
  selector: 'app-listar-vacinas',
  templateUrl: './listar-vacinas.component.html',
  styleUrls: ['./listar-vacinas.component.scss'],
})
export class ListarVacinasComponent {
  vacinas: Vacina[] = [
  //   {
  //     id: '1',
  //     nome: 'teste',
  //     composicao: 'nova composição',
  //     protecaoContra: 'rubeola',
  //     temIdadeRecomendada: true,
  //     tipoIdadeRecomendada: 'A',
  //     vlIdadeRecomemendada: 5,
  //   },
  ];

  displayedColumns: string[] = ['id', 'nome', 'vlIdadeRecomemendada', 'acoes'];

}
