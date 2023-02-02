import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-dialogo-confirmacao',
  templateUrl: './dialogo-confirmacao.component.html',
  styleUrls: ['./dialogo-confirmacao.component.scss'],
})
export class DialogoConfirmacaoComponent implements OnInit {
  @Input() tituloModal: string;
  @Input() pergunta: string;
  @Input() rotuloBotaoAceitar: string = 'Sim';
  @Input() rotuloBotaoRejeitar: string = 'Não';
  @Output() confirmar = new EventEmitter<any>();
  @Output() rejeitar = new EventEmitter<any>();

  @ViewChild('template', { static: true })
  template: TemplateRef<any>;

  public bsModalRef: BsModalRef;
  private data: any;

  constructor(private modalService: BsModalService) {}

  ngOnInit() {}

  public show(data?: any) {
    this.data = data;
    this.bsModalRef = this.modalService.show(this.template);
  }

  public hide() {
    this.bsModalRef.hide();
  }

  onConfirmar() {
    this.confirmar.next(this.data);
    this.hide();
  }

  onRejeitar() {
    this.rejeitar.next(this.data);
    this.hide();
  }
}
