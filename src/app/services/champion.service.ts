import { Injectable } from '@angular/core';
import { JwtService } from '../jwt/jwt.service';
import { Observable } from 'rxjs';
import { Http, Response } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { Campeon } from '../models/Campeon';
import { environment } from '../environments/environment';



@Injectable()
export class ChampionService {

    private _getChampions = environment.apiUrl + "api/Campeon/List";
    private _updateChampion = environment.apiUrl + "api/Campeon/Update";
    private _deleteChampion = environment.apiUrl + "api/Campeon/Delete";
    private _addChampion = environment.apiUrl + "api/Campeon/Add";

    constructor(private _jwt: JwtService) {

    }

    ngOnInit() {
        
    }
    public List(): Observable<Response> {
        return this._jwt.post(this._getChampions, null);
    }

    public UpdateChampion(champion: Campeon): Observable<Response> {
        return this._jwt.put(this._updateChampion, champion);
    }

    public DeleteChampion(id: string): Observable<Response> {
        return this._jwt.delete(this._deleteChampion + "?id=" + id);
    }

    public AddChampion(champion: Campeon): Observable<Response> {
      return this._jwt.post(this._addChampion, champion);
    }
}
