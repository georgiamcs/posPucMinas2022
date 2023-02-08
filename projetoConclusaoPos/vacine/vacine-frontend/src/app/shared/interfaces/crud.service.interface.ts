import { Observable } from 'rxjs';
import { CrudModel } from '../models/crud.model';

export interface ServiceCrud<T extends CrudModel> {

  listar(): Observable<T[]>;
  incluir(registro: T): Observable<T>;
  excluir(id: string): Observable<T>;
  alterar(registro: T): Observable<T>;
  procurarPorId(id: string): Observable<T>;
}
