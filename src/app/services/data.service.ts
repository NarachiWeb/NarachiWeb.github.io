import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http';
import { JwtService } from '../jwt/jwt.service';
import { Observable } from 'rxjs/Observable';
import { environment } from '../environments/environment';

@Injectable()
export class DataService {

  private _getDataRegistros = environment.apiUrl + "api/Registro/DataRegistros";


  constructor(private http: Http, private _jwt: JwtService) {

  }

  getDataRecords(): Observable<Response> {
    return this._jwt.get(this._getDataRegistros);
  }

}
