import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'vacine-select-search',
  templateUrl: './select-search.component.html',
  styleUrls: ['./select-search.component.scss'],
})
export class SelectSearchComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  @Input() form: FormGroup;
  @Input() formControlName: string = 'nome';
  @Input() label: string = 'Selecione uma opção';
  @Input() placeholder: string = 'Digite para pesquisar';
  @Input() registrosFiltrados: Observable<any[]>;
  @Input() objValue: any;

  protected control: FormControl;
  protected isCarregando: boolean = false;
  protected erroCarregando: boolean = false;

  protected display(obj: any): string {
    return obj('nome') ? obj('nome') : '';
  }
}
