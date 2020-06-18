import { Component } from '@angular/core';
import { Usuario } from '../../../models/Usuario';
import { UserService } from '../../../services/user.service';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'sign-up',
  templateUrl: 'sign-up.template.html'
})
export class SignUpComponent {

  public Usuario = new Usuario();


  constructor(private userService: UserService, private notificacionService: NotificationService) {
  }

  ngOnInit() {
  }


  Registrarse() {
    this.userService.createUser(this.Usuario).subscribe(us => {

      this.notificacionService.showDialog("info", "¡Su cuenta ha sido creada con éxito! Le damos la bienvenida a Narachi.", 4000);

    },
      error => {

        this.notificacionService.showDialog("error", "Por algún motivo, no hemos podido registrar su cuenta. Verifique los datos ingresados o intente más tarde.", 4000);

      });
  }



}
