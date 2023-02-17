import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GenericHttpService } from '../generic-http/generic-http.service';

@Injectable({
  providedIn: 'root',
})
export class GenericGetterService<T> extends GenericHttpService {
  public getById(id: string): Observable<T> {
    const url = `${this.fullApiURL}${id}`;
    return this.http.get<T>(url);
  }

  public getByIdConverted<Type>(
    id: string,
    fnTransformTipo: any
  ): Observable<Type> {
    return this.getById(id)
      .pipe(map((ret) => this.toNewType<Type>(ret, fnTransformTipo)));
  }

  public getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.fullApiURL);
  }

  public getAllConverted<Type>(fnTransformTipo: any): Observable<Type[]> {
    return this.getAll().pipe(
      map((ret) => this.toArrayNewType<Type>(ret, fnTransformTipo))
    );
  }

  private toNewType<Type>(obj: T, fnTransformTipo: any): Type {
    let novo: Type = fnTransformTipo(obj);

    return novo;
  }

  private toArrayNewType<Type>(lista: T[], fnTransformTipo: any): Type[] {
    return lista.map((c) => this.toNewType(c, fnTransformTipo));
  }
}
