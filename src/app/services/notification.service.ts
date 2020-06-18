import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Notificacion } from "../models/Notificacion";



@Injectable()
export class NotificationService {

  private Notification = new BehaviorSubject<Notificacion>(new Notificacion());
  Notificacion = new Notificacion();
  constructor() {

  }

  showDialog(style: string, message: string, time?: number) {

    this.Notificacion.visible = true;
    this.Notificacion.message = message;
    this.Notificacion.class = style;
    this.setNotification();

    if (time != null)
      setTimeout(() => { this.closeDialog(); }, time);
   
  }

  closeDialog() {
    this.Notificacion.visible = false;
    this.setNotification();
  }

  getNotification(): Observable<Notificacion> {
    return this.Notification;
  }

  setNotification() {
    return this.Notification.next(this.Notificacion);
  }


}
