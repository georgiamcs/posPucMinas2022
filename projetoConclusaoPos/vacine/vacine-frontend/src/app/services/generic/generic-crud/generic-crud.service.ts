import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { GenericGetterService } from 'src/app/services/generic/generic-getter/generic-getter.service';
import { EntityModel } from '../../../shared/models/entity.model';

@Injectable({
  providedIn: 'root',
})
export class GenericCrudService<
  T extends EntityModel
> extends GenericGetterService<T> {

  add(record: T): Observable<T> {
    return this.http.post<T>(this.fullApiURL, record);
  }

  delete(id: string): Observable<T> {
    const url = `${this.fullApiURL}${id}`;
    return this.http.delete<T>(url);
  }

  update(registro: T): Observable<T> {
    const url = `${this.fullApiURL}${registro._id}`;
    return this.http.put<T>(url, registro);
  }
}
