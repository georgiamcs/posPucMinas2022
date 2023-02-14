import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'vacine-select-search',
  templateUrl: './select-search.component.html',
  styleUrls: ['./select-search.component.scss'],
})
export class SelectSearchComponent implements ControlValueAccessor, OnInit {
  @Input() form: FormGroup;
  @Input() formControlName: string = 'nome';
  @Input() label: string = 'Selecione uma opção';
  @Input() placeholder: string = 'Digite para pesquisar';
  @Input() registrosFiltrados: Observable<any[]>;
  @Input() objValue: any;

  protected control: FormControl;
  protected isCarregando: boolean = false;
  protected erroCarregando: boolean = false;

  ngOnInit(): void {
    this.control = this.form?.controls[this.formControlName] as FormControl;
    this.objValue = this.control?.value;
  }

  writeValue(obj: any): void {
    throw new Error('Method not implemented.');
  }
  registerOnChange(fn: any): void {
    throw new Error('Method not implemented.');
  }
  registerOnTouched(fn: any): void {
    throw new Error('Method not implemented.');
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

  protected display(obj: any): string {
    return obj('nome') ? obj('nome') : '';
  }
}
