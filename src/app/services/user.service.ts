import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http';
import { JwtService } from '../jwt/jwt.service';
import { Usuario } from '../models/Usuario';
import { Observable } from 'rxjs/Observable';
import { ChangePassword } from '../views/appviews/profile/profile.component';
import { environment } from '../environments/environment';

@Injectable()
export class UserService {

  private _userCreate = environment.apiUrl + "api/Usuario/Add";
  private _getMyProfile = environment.apiUrl + "api/Usuario/Get";
  private _updateUser = environment.apiUrl + "api/Usuario/Update";
  private _changePassword = environment.apiUrl + "api/Usuario/ChangePassword";
  private _list = environment.apiUrl + "api/Usuario/List";
  private _roles = environment.apiUrl + "api/Usuario/Roles";


  constructor(private http: Http, private _jwt: JwtService ) {

  }

  createUser(user: Usuario): Observable<Response> {
      return this.http.post(this._userCreate, user);
  }

  getMyProfile(): Observable<Response> {
      return this._jwt.get(this._getMyProfile);
  }

  updateUser(user: Usuario): Observable<Response> {
      return this._jwt.put(this._updateUser, user);
  }

  changePassword(user: ChangePassword) {
    return this._jwt.post(this._changePassword, user);
  }

  list() {
    return this._jwt.get(this._list);
  }

  getRoles() {
    return this._jwt.get(this._roles);
  }


} 
