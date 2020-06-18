// src/app/auth/role-guard.service.ts
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/auth.service';
import { JwtService } from '../jwt/jwt.service';

@Injectable()
export class RoleGuardService implements CanActivate {
  constructor(public auth: AuthenticationService, public router: Router, private jwtService: JwtService) { }
  canActivate(route: ActivatedRouteSnapshot): boolean {

    if (this.auth.isLoggedIn()) {

      let expectedPrivilege = +route.data.expectedPrivilege;
      var privilege = this.jwtService.getPrivilege();
      if (!(privilege >= expectedPrivilege)) {
        this.router.navigate(['home']);
        return false;

      }
    }
    else {
      this.router.navigate(['login']);
      return false;

    }

    return true;
  }
}
