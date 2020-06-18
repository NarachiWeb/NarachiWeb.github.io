import { Injectable } from "@angular/core";
import { Usuario } from "../models/Usuario";
import { BehaviorSubject, Subject, Observable } from "rxjs";
import { DatePipe } from "@angular/common";

@Injectable()
export class AppService {

    private Usuario = new BehaviorSubject<Usuario>(new Usuario());



    constructor(private datePipe: DatePipe) {

    }

    setUsuario(user: Usuario) {
      localStorage.removeItem('profile');
      localStorage.setItem('profile', JSON.stringify(user));


      return this.Usuario.next(user);
    }


    getUsuario(): Observable<Usuario> {

      return this.Usuario;
    }


    removeDuplicates(originalArray, prop) {
        var newArray = [];
        var lookupObject = {};

        for (var i in originalArray)
            lookupObject[originalArray[i][prop]] = originalArray[i];

        for (i in lookupObject)
            newArray.push(lookupObject[i]);

        return newArray;
    }

    transformFecha(FechaNacimiento: Date): string {
      return this.datePipe.transform(FechaNacimiento, "dd/MM/yyyy");
    }

    getAgeByDate(date: any): number {

      const today = new Date();
      const birthDate = new Date(date);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) { age-- }
      return age;
    }

}
