import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http';
import { JwtService } from '../jwt/jwt.service';
import { Usuario } from '../models/Usuario';
import { Observable } from 'rxjs/Observable';
import { ChangePassword } from '../views/appviews/profile/profile.component';
import { environment } from '../environments/environment';

@Injectable()
export class RolesService {

  private _getRoles = environment.apiUrl + "api/Roles/List";


  constructor(private http: Http, private _jwt: JwtService) {

  }

  getRoles(): Observable<Response> {
    return this._jwt.get(this._getRoles);
  }

}
