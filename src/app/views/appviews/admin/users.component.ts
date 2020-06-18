import { Component } from '@angular/core';
import { NotificationService } from '../../../services/notification.service';
import { UserService } from '../../../services/user.service';
import { Usuario } from '../../../models/Usuario';
import { AppService } from '../../../services/app.service';
import { Rol } from '../../../models/Rol';
import { JwtService } from '../../../jwt/jwt.service';

@Component({
  selector: 'users',
  templateUrl: 'users.template.html'
})


export class UsersComponent {

  Usuarios = new Array<Usuario>();
  User = new Usuario();
  Roles = new Array<Rol>();

  constructor(private notificationService: NotificationService, private userService: UserService, private appService: AppService, private jwtService: JwtService) {
  }

  ngOnInit() {

    this.getUsers();
    this.getRoles();
  }

  getUsers() {
    this.userService.list().subscribe(us => {

      var Result = JSON.parse(us.text());

      this.Usuarios = <Usuario[]>Result;

    });

    
  }

  setFecha(date: Date) {
    return this.appService.transformFecha(date);
  }

  getAge(date: Date) {
    return this.appService.getAgeByDate(date);
  }

  getRoles() {
    this.userService.getRoles().subscribe(us => {

      var Result = JSON.parse(us.text());
      this.Roles = <Rol[]>Result;
      
    });
  }

  updateUser() {
    this.userService.updateUser(this.User).subscribe(us => {

      this.notificationService.showDialog("success", "Usuario actualizado con éxito.", 3000);

      if (this.jwtService.getId() == this.User.Id) 
        this.appService.setUsuario(this.User);

      
    },
    error => {

      this.notificationService.showDialog("error", "Ups, algo salió mal.", 3000);

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
            this.User.Avatar = 'data:image/png;base64,' + btoa(<string>result);
          }
        };
        reader.readAsBinaryString(file);
      }
    }
  }

  cameraButton(event) { }

}
