import { Injectable } from '@angular/core';
import { JwtService } from '../jwt/jwt.service';
import { Observable } from 'rxjs';
import { Response } from '@angular/http';
import { Registro } from '../models/Registro';
import { environment } from '../environments/environment';
import { PaginationParams } from '../models/PaginationParams';



@Injectable()
export class RecordService {

    private _GetTypeOfRecords = environment.apiUrl + "api/Registro/TypesOfRecords"
    private _AddRecord = environment.apiUrl + "api/Registro/Add";
    private _GetRecordsByType = environment.apiUrl + "api/Registro/GetRecordsByType";
    private _GetRecordsByTypes = environment.apiUrl + "api/Registro/GetRecordsByTypes";
    private _List = environment.apiUrl + "api/Registro/List";
    private _GetMyRecordsByChampion = environment.apiUrl + "api/Registro/GetMyRecordsByChampion";
    private _GetMyRecordsByEnemy = environment.apiUrl + "api/Registro/GetMyRecordsByEnemy";
    private _UpdateRecord = environment.apiUrl + "api/Registro/Update";
    private _DeleteRecord = environment.apiUrl + "api/Registro/Delete";
    private _GetRecordsOfUser = environment.apiUrl + "api/Registro/GetRecordsOfUser";
    private _GetRecordsByChampionName = environment.apiUrl + "api/Registro/GetRecordsFromChampionName";
    private _PagedList = environment.apiUrl + "api/Registro/PagedList";

    constructor(private jwtService: JwtService) {
    }

    public GetTypeOfRecords(): Observable<Response> {
        return this.jwtService.get(this._GetTypeOfRecords);
    }

    public SaveRecord(record: Registro): Observable<Response> {
        return this.jwtService.post(this._AddRecord, record);
    }

    public GetRecordsByType(Tipo: string): Observable<Response> {
        return this.jwtService.get(this._GetRecordsByType + "?Tipo=" + Tipo);
    }

    public GetRecordsByTypes(Tipos: string[]): Observable<Response> {
        return this.jwtService.post(this._GetRecordsByTypes, Tipos);
    }

    public List(): Observable<Response> {
        return this.jwtService.get(this._List);
    }

    public getPagedList(params: PaginationParams): Observable<Response> {
        return this.jwtService.post(this._PagedList, params);
    }

    public ListByIds(Ids: string[]): Observable<Response> {
        return this.jwtService.post(this._List, Ids);
    }

    public GetMyRecordsByChampion(Id: string): Observable<Response> {
        return this.jwtService.get(this._GetMyRecordsByChampion + "?Id=" + Id);
    }

    public GetMyRecordsByEnemy(Id: string): Observable<Response> {
        return this.jwtService.get(this._GetMyRecordsByEnemy + "?Id=" + Id);
    }

    public UpdateRecord(Registro: Registro): Observable<Response> {
        return this.jwtService.put(this._UpdateRecord, Registro);
    }

    public DeleteRecord(Id: string): Observable<Response> {
        return this.jwtService.delete(this._DeleteRecord + "?Id=" + Id);
    }

    public GetRecordsOfUser(Id: string): Observable<Response> {
        return this.jwtService.get(this._GetRecordsOfUser + "?Id=" + Id);
    }

    public GetRecordsByChampionName(Name: string): Observable<Response> {
        return this.jwtService.get(this._GetRecordsByChampionName + "?Champion=" + Name);
    }
}
