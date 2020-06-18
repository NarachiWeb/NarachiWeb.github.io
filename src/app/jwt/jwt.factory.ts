import { XHRBackend } from '@angular/http';
import { JwtRequestOptions } from './jwt.options';
import { JwtService } from './jwt.service';
import { AuthenticationService } from './../services/auth.service'
import { Router } from '@angular/router';

function httpServiceFactory(backend: XHRBackend, options: JwtRequestOptions, authService: AuthenticationService, router: Router) {
    return new JwtService(backend, options, authService, router);
}
export { httpServiceFactory };
