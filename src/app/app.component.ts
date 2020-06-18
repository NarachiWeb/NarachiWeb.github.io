import { Component } from '@angular/core';
import { NotificationService } from './services/notification.service';
import { Notificacion } from './models/Notificacion';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  Notificacion = new Notificacion();

  constructor(private notificationService: NotificationService) {
    
  }

  ngOnInit() {
    this.notificationService.getNotification().subscribe(x => this.Notificacion = x);
  }

  closeNot() {
    this.notificationService.closeDialog();
  }

}
