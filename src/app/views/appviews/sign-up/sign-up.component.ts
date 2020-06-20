import { Component } from '@angular/core';
import { Usuario } from '../../../models/Usuario';
import { UserService } from '../../../services/user.service';
import { NotificationService } from '../../../services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'sign-up',
  templateUrl: 'sign-up.template.html'
})
export class SignUpComponent {

  public Usuario = new Usuario();
  error: string;


  constructor(private userService: UserService, private notificacionService: NotificationService, private router: Router) {
  }

  ngOnInit() {
  }


  Registrarse() {
    this.error = null;
    this.userService.createUser(this.Usuario).subscribe(us => {

      this.notificacionService.showDialog("info", "¡Su cuenta ha sido creada con éxito! Le damos la bienvenida a Narachi.", 8000);
      this.router.navigate(['login']);

    },
      error => {
        debugger;
        this.error = error._body;
        this.notificacionService.showDialog("error", "Por algún motivo, no hemos podido registrar su cuenta. Verifique los datos ingresados o intente más tarde.", 6000);

      });
  }



}
