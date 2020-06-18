import { RolesDeCampeon } from "./RolesDeCampeon";

export class Campeon {
    Id: string;
    Nombre: string;
    CreadoEn: Date;
    EditadoEn: Date;
    RolId: string;
    Avatar: string;
    Roles: RolesDeCampeon;

    selected: boolean = false;
}
