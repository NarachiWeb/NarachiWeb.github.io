import { Component } from '@angular/core';
import { AuthenticationService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { Login } from '../../../models/Login';
import { UserService } from '../../../services/user.service';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'login',
  templateUrl: 'login.template.html'
})
export class LoginComponent {

  public UserLogin = new Login();
  Loading = false;


  constructor(private authService: AuthenticationService, private router: Router, private userService: UserService, private notificationService: NotificationService) {
  }

  ngOnInit() {
  }

  Login() {
    this.Loading = true;
    this.authService.login(this.UserLogin).subscribe(us => {
      this.router.navigate(['Home']);
      this.Loading = false;


    },

      error => {
        this.Loading = false;
        this.notificationService.showDialog("error", "Usuario o contraseña invalidos.", 2000);


      }

    );
  }




}
