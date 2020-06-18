export class TipoDeRegistro {
    Id: string;
    Nombre: string;
    Descripcion: string;
    Checked: boolean;
}

export enum TipoRegistro {
    Anotacion = "fc1d6364-5e4b-4755-6e01-08d7a5bb21e4",
    ErrorConCampeon = "0d70ecf8-ed08-480f-6dff-08d7a5bb21e4",
    ErrorContraCampeon = "4c28d67f-e8bf-4e5c-6e00-08d7a5bb21e4"
}
