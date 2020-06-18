import { Component } from '@angular/core';
import { smoothlyMenu } from '../../../app.helpers';
import { Usuario } from '../../../models/Usuario';
declare var jQuery:any;

@Component({
  selector: 'topnavbar',
  templateUrl: 'topnavbar.template.html'
})
export class TopNavbarComponent {

  Usuario = new Usuario();
  

  constructor() { }


  toggleNavigation(): void {
    jQuery("body").toggleClass("mini-navbar");
    smoothlyMenu();
  }





}
