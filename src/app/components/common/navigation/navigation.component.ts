import { Component } from '@angular/core';
import {Router} from '@angular/router';
import 'jquery-slimscroll';
import { Usuario } from '../../../models/Usuario';
import { AppService } from '../../../services/app.service';
import { JwtService } from '../../../jwt/jwt.service';
import { AuthenticationService } from '../../../services/auth.service';

declare var jQuery:any;

@Component({
  selector: 'navigation',
  templateUrl: 'navigation.template.html'
})

export class NavigationComponent {

  
  Usuario = new Usuario();
  Privilegio: number;

  constructor(private router: Router, private appService: AppService, private jwtService: JwtService, private authService: AuthenticationService) { }

  ngAfterViewInit() {
    jQuery('#side-menu').metisMenu();

    if (jQuery("body").hasClass('fixed-sidebar')) {
      jQuery('.sidebar-collapse').slimscroll({
        height: '100%'
      })
    }
  }

  ngOnInit() {
    this.appService.getUsuario().subscribe(user => this.Usuario = user);

    this.getProfile();
  }

  activeRoute(routename: string): boolean{
    return this.router.url == routename;
  }

  getProfile() {
    var User = JSON.parse(localStorage.getItem('NarachiProfile'));
    this.Usuario = <Usuario>User;
    this.Privilegio = this.jwtService.getPrivilege();

  }

  logOut() {
    this.authService.logOut();
    this.router.navigate(['login']);

  }
  
}
