import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environment';

@Injectable({
  providedIn: 'root',
})
export class GenericHttpService {
  protected fullApiURL: string;
  private _relativeApiURL: string;

  protected http: HttpClient;

  set relativeApiURL(v: string) {
    this._relativeApiURL = v;
    this.fullApiURL = `${environment.API_URL_BASE}${this._relativeApiURL}/`;
  }
}
