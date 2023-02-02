import { DialogoConfirmacaoComponent } from './../../lib/dialogo-confirmacao/dialogo-confirmacao.component';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

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

  private ROTULO_BOTAO_ACEITAR = 'Sim';
  private ROTULO_BOTAO_REJEITAR = 'Não';

  constructor(
    private vacinaService: VacinaService,
    public dialogoConf: MatDialog
  ) {}

  ngOnInit(): void {
    this.carregarVacinas();
  }

  carregarVacinas() {
    this.vacinaService.listar().subscribe((listaVacinas) => {
      this.vacinas = listaVacinas;
      console.log('listaVacinas:', listaVacinas);
    });
  }

  excluirVacina(idVacina: string) {
      this.vacinaService.excluir(idVacina).subscribe(() => {
        this.carregarVacinas();
      });
  }

  confirmarExclusaoVacina(vacina: Vacina) {
    const modalRef = this.dialogoConf.open(DialogoConfirmacaoComponent, {
      data: {
        tituloModal: 'Exclusão de Vacina',
        pergunta: `Confirma a exclusão da vacina "'${vacina.tx_nome}'"?`,
        rotuloAceitar: this.ROTULO_BOTAO_ACEITAR,
        rotuloRejeitar: this.ROTULO_BOTAO_REJEITAR,
      },
    });

    console.log('excluindo vacina', vacina._id);

    modalRef.afterClosed().subscribe((result) => {
      if (result == this.ROTULO_BOTAO_ACEITAR && vacina._id) {
        this.excluirVacina(vacina._id);
      }
    });
  }

}
