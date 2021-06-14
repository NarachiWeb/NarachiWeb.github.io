import { Component } from '@angular/core';
import { RecordService } from '../../../services/record.service';
import { Registro } from '../../../models/Registro';
import { ChampionService } from '../../../services/champion.service';
import { Campeon } from '../../../models/Campeon';
import { TipoDeRegistro } from '../../../models/TipoDeRegistro';
import { NotificationService } from '../../../services/notification.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { PaginationParams } from '../../../models/PaginationParams';
import { GridDTO } from '../../../models/GridDTO';

@Component({
  selector: 'list',
  templateUrl: 'list.template.html',
  styleUrls: ['list.component.css']

})
export class ListComponent {

  Registros = new Array<Registro>();
  Campeones = new Array<Campeon>();
  List = new Array<Campeon>();
  SelCampeon = new Campeon();
  SelEnemigo = new Campeon();
  Tipos = new Array<TipoDeRegistro>();
  TipoRegistro = new TipoDeRegistro();
  Show = false;
  Loading = false;
  SelectedRecord = new Registro();
  SearchCampeones = new Array<Campeon>();
  Search: string;
  Bolt: boolean = false;
  Editing: boolean = false;
  Grid = new GridDTO<Registro>();

  constructor(
    private recordService: RecordService,
    private campeonService: ChampionService,
    private notificationService: NotificationService,
    private datePipe: DatePipe,
    private router: Router) {
  }

  ngOnInit() {
    this.getRecords();
    this.getChampions();
    this.getTypesOfRecords();
   
  }

  getRecords() {
    this.Loading = true;
    this.recordService.getPagedList({ PageSize: 10, PageNumber: 1 }).subscribe(us => {
      var Result = JSON.parse(us.text());
      this.Grid = <GridDTO<Registro>>Result;
      this.Loading = false;
    },
      error => { this.Loading = false;}
    );
  }

  getChampions() {
    this.campeonService.List().subscribe(us => {
      var Result = JSON.parse(us.text());
      this.Campeones = <Campeon[]>Result;
      this.List = this.Campeones;

  
    });
  }

  getTypesOfRecords() {
    this.recordService.GetTypeOfRecords().subscribe(us => {

      var Registros = JSON.parse(us.text());
      this.Tipos = <TipoDeRegistro[]>Registros;


    });
  }

  deleteRecord(id: string) {
    this.recordService.DeleteRecord(id).subscribe(us => {

      this.Registros = this.Registros.filter(x => x.Id != id);

      this.notificationService.showDialog("info", "Registro eliminado con éxito.", 4000);


    });
  }


  getRecordsByTypes() {

    this.Bolt = false;
    var Tipos = this.Tipos.filter(function (v) { return v.Checked }).map(function (v) { return v.Id });

    if (Tipos.length == 0)
      return;

    this.Loading = true;
    this.recordService.GetRecordsByTypes(Tipos).subscribe(us => {

      var Result = JSON.parse(us.text());

      this.Registros = <Registro[]>Result;
      this.Loading = false;

    },

      error => { this.Loading = false; });

  }

  checkSelectedTypes(): boolean {
    var Tipos = this.Tipos.filter(function (v) { return v.Checked }).map(function (v) { return v.Id });
    return (Tipos.length == 0);
  }

  updateRecord(registro: Registro) {

    this.recordService.UpdateRecord(registro).subscribe(us => {
      this.notificationService.showDialog("success", "Registro editado con éxito.", 4000);
      registro.Edit = false;
    });
  }

  addChampionToList(campeon: Campeon) {

    var Campeon = this.SearchCampeones.find(x => x.Id == campeon.Id);

    if (Campeon == null) {
      this.SearchCampeones.push(campeon);
      this.Search = "";
      this.filterSearch();
    }

  }

  removeChampion(Id: string) {
    this.SearchCampeones = this.SearchCampeones.filter(x => x.Id != Id);
  }

  filterSearch() {
    this.List = this.filterByValue(this.Campeones, this.Search);
  }

  filterByValue(array, string) {

      return array.filter((data) => JSON.stringify(data.Nombre).toLowerCase().indexOf(string.toLowerCase()) !== -1);
    
  }

  clearList() {
    this.SearchCampeones = new Array<Campeon>();
  }

  searchRecordsByChampions() {
    var Ids = this.SearchCampeones.filter(x => x.Id).map(x => x.Id);
    this.Loading = true;
    this.recordService.ListByIds(Ids).subscribe(us => {
      this.Loading = false;
      var Result = JSON.parse(us.text());
      this.Registros = <Registro[]>Result;

    });
  }

  transformFecha(FechaNacimiento: Date): string {
    return this.datePipe.transform(FechaNacimiento, "dd/MM/yyyy");
  }

  selectRecord(registro: Registro) {
    this.SelectedRecord = registro;
  }

  anyRecordEditing(): boolean {

    var record = this.Registros.find(x => x.Edit);
    return record != null;
  }

  openRecord(name: string) {
    //this.router.navigate(['records/champion'], { queryParams: { name: name } });
    debugger;
    var currentUrl = window.location.origin;

    window.open(currentUrl + "/#/records/champion?name=" + name, "_blank");
  }

  getPage(params: PaginationParams) {
    this.Loading = true;
    this.recordService.getPagedList(params).subscribe(us => {
      var Result = JSON.parse(us.text());
      this.Grid = <GridDTO<Registro>>Result;
      this.Loading = false;
    },
      error => { this.Loading = false; }
    );
  }

}
