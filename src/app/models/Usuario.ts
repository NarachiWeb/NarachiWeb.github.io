export class Usuario {
    Id: string;
    Nombre: string;
    Apellido: string;
    FechaNacimiento: Date;
    Username: string;
    Password: string;
    ConfirmPassword: string;
    Genero: number | null;
    Correo: string;
    FechaCreacion: Date;
    FechaEdicion: Date;
    Avatar: string;
    Edad: number;
    RolId: string;
    Privilegio: number;
    Nickname: string;

}

export class LoginUser {
  userName: string;
  clave: string;
}
