import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface ParametrosDialogoConfirmacao {
  pergunta: 'string';
  tituloModal: 'string';
  rotuloAceitar: 'string';
  rotuloRejeitar: 'string';
}

@Component({
  selector: 'app-dialogo-confirmacao',
  templateUrl: './dialogo-confirmacao.component.html',
  styleUrls: ['./dialogo-confirmacao.component.scss'],
})
export class DialogoConfirmacaoComponent {
  constructor(
    public modal: MatDialogRef<DialogoConfirmacaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ParametrosDialogoConfirmacao
  ) {
  }

  onRejeitar(): void {
    this.modal.close();
  }
}
