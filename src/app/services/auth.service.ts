import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { Login } from '../models/Login';
import { map } from "rxjs/operators";
import { Injectable } from '@angular/core';
import { Usuario } from '../models/Usuario';
import { AppService } from './app.service';
import { environment } from '../environments/environment';
import { JwtService } from '../jwt/jwt.service';

export interface IUser {
    Username: string;
    Password: string;
}

@Injectable()

export class AuthenticationService {
    public token: string;
    public Usuario: Usuario;

  constructor(private http: Http, private appService: AppService) {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;

    }

    login(user: IUser): Observable<boolean> {

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(environment.apiUrl + 'api/Usuario/Login', user, options).map((response: Response) => {

          let res = JSON.parse(response.text());          
            let token = res && res.token;
            let user = res && res.user;
            let refreshToken = res && res.expiration;

            if (token) {

                this.setToken(token, refreshToken);
                this.setUser(user);
                return true;
            }

            return false;

        });
    }

    setToken(token, refreshToken) {
        this.token = token;
        localStorage.setItem('currentUser', JSON.stringify({ token: token, refreshToken: refreshToken }));

    }

    setUser(user) {

      var us = JSON.stringify(user);
      //us.Privilegio = this.jwtService.getPrivilege();
      localStorage.setItem('NarachiProfile', us);

      var usuario = JSON.parse(us);
      this.appService.setUsuario(usuario);

    }





    logOut(): void {
        this.token = null;
        localStorage.removeItem('currentUser');
      localStorage.removeItem('NarachiProfile');
    }

    refreshToken(): Observable<boolean> {
      debugger;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Bearer ' + this.token);

        let options = new RequestOptions({ headers: headers });
      let userActual = JSON.parse(localStorage.getItem('NarachiProfile'));

        let body = new URLSearchParams();

      body.set('NarachiProfile', userActual.Username);

      var fakePassword = (this.S4() + this.S4() + "-" + this.S4() + "-4" + this.S4().substr(0, 3) + "-" + this.S4() + "-" + this.S4() + this.S4() + this.S4()).toLowerCase();

      return this.http.post(environment.apiUrl + "api/Usuario/RefreshToken", { username: userActual.Username, password: fakePassword }, options).pipe(map((response: Response) => {

          let token = response.json() && response.json().token;
          let refreshToken = response.json() && response.json().expiration;


          if (token) {
              this.token = token;
              localStorage.setItem('currentUser', JSON.stringify({ username: userActual.Username, token: token, refreshToken: refreshToken }));
              return true;
          }

          return false;

       }));
            
       

    }

    isLoggedIn(): boolean { return this.token != null; }

    S4() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

}
