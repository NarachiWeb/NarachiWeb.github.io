import { Injectable } from '@angular/core';
import { AuthenticationService } from './../services/auth.service'

import { Http, RequestOptions, RequestOptionsArgs, Response, Request, Headers, XHRBackend} from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

import { JwtRequestOptions } from './jwt.options';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class JwtService extends Http {
    public token: string;
    public nameid: string;
    private headers: any;
    public antiCsrfToken: string;
    constructor(
        backend: XHRBackend,
        defaultOptions: JwtRequestOptions,
      private authService: AuthenticationService,
      private router: Router) {
        super(backend, defaultOptions);
        let user = JSON.parse(localStorage.getItem('currentUser'));
        this.token = user && user.token;
        this.antiCsrfToken = undefined;
    }

     //HttpService
    get(url: string, options?: RequestOptionsArgs): Observable<any> {
        if (this.IsTokenExpired())
            return this.authService.refreshToken().catch((error: any) => {
                console.log('errorcatch', error);
              this.authService.logOut();
              this.router.navigate(['login']);

                return Observable.throw(new Error(error.status));

            }).flatMap(() => { return this.get(url, options); });

        options = this.requestOptions(options);
        if (this.antiCsrfToken != undefined)
            options.headers.append('X-CSRFToken', this.antiCsrfToken);


        return super.get(this.getFullUrl(url), options).do((res: Response) =>
        {
                if (res.headers.get("csrftoken") != undefined)
                    this.antiCsrfToken = res.headers.get("csrftoken");
        }, (error: any) =>
        {
                if (error.headers.get("csrftoken") != undefined)
                    this.antiCsrfToken = error.headers.get("csrftoken");
        }).finally(() =>
        {
        });
    }

     //HttpService
    delete(url: string, options?: RequestOptionsArgs): Observable<any> {
        if (this.IsTokenExpired())
            return this.authService.refreshToken().catch((error: any) => {
                console.log('errorcatch', error);
              this.authService.logOut();
              this.router.navigate(['login']);

                return Observable.throw(new Error(error.status));

            })
                .flatMap(() => { return this.get(url, options); });

        options = this.requestOptions(options);
        if (this.antiCsrfToken != undefined)
            options.headers.append('X-CSRFToken', this.antiCsrfToken);


        //console.log(this.getFullUrl(url));
        return super.delete(this.getFullUrl(url), options)
            //  .catch() // Catch exception here
            .do((res: Response) => {
                if (res.headers.get("csrftoken") != undefined)
                    this.antiCsrfToken = res.headers.get("csrftoken");
                //this.antiCsrfToken = res.headers.
                // Handle success, maybe display notification
            }, (error: any) => {
                if (error.headers.get("csrftoken") != undefined)
                    this.antiCsrfToken = error.headers.get("csrftoken");
                // Handle errors
            })
            .finally(() => {
                // Request completed
            });
    }

    post(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {

        if (this.IsTokenExpired())
            return this.authService.refreshToken().catch((error: any) => {
              this.authService.logOut();
              this.router.navigate(['login']);

                return Observable.throw(new Error(error.status));

            })
                .flatMap(() => { return this.post(url, body, options); });

        options = this.requestOptions(options);
        if (this.antiCsrfToken != undefined)
            options.headers.append('X-CSRFToken', this.antiCsrfToken);

        return super.post(this.getFullUrl(url), body, options)
            //  .catch() // Catch exception here
            .do((res: Response) => {

                if (res.headers.get("csrftoken") != undefined)
                    this.antiCsrfToken = res.headers.get("csrftoken");
                // Handle success, maybe display notification
            }, (error: any) => {

                if (error.headers.get("csrftoken") != undefined)
                    this.antiCsrfToken = error.headers.get("csrftoken");
                // Handle errors
            })
            .finally(() => {
                // Request completed
            });
    }

    put(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
        if (this.IsTokenExpired())
            return this.authService.refreshToken().catch((error: any) => {
              this.authService.logOut();
              this.router.navigate(['login']);

                return Observable.throw(new Error(error.status));

            })
                .flatMap(() => { return this.put(url, body, options); });

        options = this.requestOptions(options);
        if (this.antiCsrfToken != undefined)
            options.headers.append('X-CSRFToken', this.antiCsrfToken);


        return super.put(this.getFullUrl(url), body, options)
            //  .catch() // Catch exception here
            .do((res: Response) => {
                if (res.headers.get("csrftoken") != undefined)
                    this.antiCsrfToken = res.headers.get("csrftoken");
                // Handle success, maybe display notification
            }, (error: any) => {
                if (error.headers.get("csrftoken") != undefined)
                    this.antiCsrfToken = error.headers.get("csrftoken");
                // Handle errors
            })
            .finally(() => {
                // Request completed
            });
    }

    public getId(): string {
        var data = this.parseToken();

        if (data)
            this.nameid = data['nameid'];
        else
            this.nameid = null;

        return this.nameid;
    }

    public existRole(role: string): boolean {
        var data = this.parseToken();

        if (!data)
            return false;

        this.nameid = data['nameid'];

        if (!data["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"])
            return false;

        return data["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] == role || data["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes(role);
    }

    private getFullUrl(url: string): string {
        return url;
    }

    private parseToken() {
        let user = JSON.parse(localStorage.getItem('currentUser'));

        if (!user || !user.token)
            return null;

        this.token = user.token;
        var base64Url = this.token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');

        return JSON.parse(window.atob(base64));
    }

    public getPrivilege(): number {

      var data = this.parseToken();
      var privilege = data["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      return +privilege;

    }

    private IsTokenExpired(): boolean {
        let user = JSON.parse(localStorage.getItem('currentUser'));
        //console.log(user);
        if (!user || user == null)
            this.authService.logOut();
        if (!user.token)
            return true;
        this.token = user.token;
        var base64Url = this.token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        var data = JSON.parse(window.atob(base64));
        //console.log(data);
        //Si esta por terminar la sesion ya refresco
        data.exp -= 240;
        var value = (Date.now() / 1000) > data.exp
        return value;
    }

    private requestOptions(options?: RequestOptionsArgs): RequestOptionsArgs {
        if (options == null) {
            options = new JwtRequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
        }
        return options;
    }
}
