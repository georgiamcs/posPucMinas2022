import { Observable } from 'rxjs';
import { CrudModel } from '../models/crud.model';

export interface ServiceCrud {

  listar(): Observable<CrudModel[]>;
  incluir(registro: CrudModel): Observable<CrudModel>;
  excluir(id: string): Observable<CrudModel>;
  alterar(registro: CrudModel): Observable<CrudModel>;
  procurarPorId(id: string): Observable<CrudModel>;
}
