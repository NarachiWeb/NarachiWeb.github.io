import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Usuario } from '../../../models/Usuario';
import { DatePipe } from '@angular/common';
import { AppService } from '../../../services/app.service';
import { NotificationService } from '../../../services/notification.service';

export class ChangePassword {
  Password: string;
  PasswordNew: string;
  Repeat: string;
}

@Component({
  selector: 'profile',
  templateUrl: 'profile.template.html'
})
export class ProfileComponent {

  Usuario = new Usuario();
  User = new ChangePassword();
  Profile = true;
  ChangePass = false;


  Generos: any[] = [{ "Id": 0, "Nombre": "Masculino" }, { "Id": 1, "Nombre": "Femenino"}];


  constructor(private userService: UserService, private appService: AppService, private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    var User = JSON.parse(localStorage.getItem('NarachiProfile'));
    this.Usuario = <Usuario>User;
  }

 
  

  getAgeByDate(date: any): number {

    const today = new Date();
    const birthDate = new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) { age-- }
    return age;
  }

 

  saveUser() {
    this.userService.updateUser(this.Usuario).subscribe(us => {

      localStorage.removeItem('NarachiProfile');
      localStorage.setItem('NarachiProfile', JSON.stringify(this.Usuario));
      this.appService.setUsuario(this.Usuario);
      this.notificationService.showDialog("success", "Perfil guardado con éxito.", 4000);


    }, error => {
        this.notificationService.showDialog("error", "Algo salió mal. Verifique los datos ingresados o intentelo más tarde.", 4000);


    });
  }

  processFile(imageInput: any) {
    if (imageInput.files && imageInput.files[0]) {
      const file: File = imageInput.files[0];
      const reader = new FileReader();

      let okExtension = false;
      const extensionesValidas = ['jpg', 'png'];
      const extension = imageInput.files[0].name.split('.').pop();

      extensionesValidas.forEach(function (ext) {
        if (ext == extension) {
          okExtension = true;
          return;
        }
      });

      if (okExtension) {
        reader.onload = event => {
          let result = (<FileReader>event.target).result;
          if ((<FileReader>event.target).result) {
            this.Usuario.Avatar = 'data:image/png;base64,' + btoa(<string>result);
            }
        };
        reader.readAsBinaryString(file);
      }
    }
  }

  cameraButton(event) { }

  changePassword() {

    this.userService.changePassword(this.User).subscribe(us => {
      this.notificationService.showDialog("success", "Contraseña actualizada correctamente.", 4000);
      this.User = new ChangePassword();
    },

      error => {
        this.notificationService.showDialog("error", "Algo salió mal. Verifique los datos ingresados o intentelo más tarde.", 4000);
}

    );


  }
}
