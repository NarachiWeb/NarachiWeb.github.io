import { Component } from '@angular/core';
import { ChampionService } from '../../../services/champion.service';
import { Campeon } from '../../../models/Campeon';
import { RolesService } from '../../../services/roles.service';
import { RolesDeCampeon } from '../../../models/RolesDeCampeon';
import { NotificationService } from '../../../services/notification.service';


@Component({
  selector: 'champions',
  templateUrl: 'champions.template.html'
})
export class ChampionsComponent {


  Campeones = new Array<Campeon>();
  Campeon = new Campeon();
  List = new Array<Campeon>();
  Roles = new Array<RolesDeCampeon>();
  Search: string;
  nCampeon = new Campeon();

  constructor(private championService: ChampionService, private rolesService: RolesService, private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.getChampions();
    this.getRoles();
  }

  getChampions() {
    this.championService.List().subscribe(us => {

      var Result = JSON.parse(us.text());
      this.Campeones = <Campeon[]>Result;
      this.List = <Campeon[]>Result;

      //this.Campeon = this.List[0];

    });
  }

  getRoles() {
    this.rolesService.getRoles().subscribe(us => {

      var Result = JSON.parse(us.text());
      this.Roles = <RolesDeCampeon[]>Result;

    });
  }


  filterSearch() {
    this.List = this.filterByValue(this.Campeones, this.Search);
  }

  filterByValue(array, string) {

    return array.filter((data) => JSON.stringify(data.Nombre).toLowerCase().indexOf(string.toLowerCase()) !== -1);

  }

  updateChampion() {
    this.championService.UpdateChampion(this.Campeon).subscribe(us =>
    {
      this.notificationService.showDialog("info", "Campeón actualizado con éxito.", 3000);


    },
      error => {
        this.notificationService.showDialog("error", "Ups, algo salió mal.", 3000);

      });
  }

  deleteChampion() {
    this.championService.DeleteChampion(this.Campeon.Id).subscribe(us => {
      this.notificationService.showDialog("info", "Campeón actualizado con éxito.", 3000);
      this.Campeon = new Campeon();
    },
      error => {
        this.notificationService.showDialog("error", "Ups, algo salió mal.", 3000)

      });
  }

  addChampion() {
    this.championService.AddChampion(this.nCampeon).subscribe(us => {

      this.notificationService.showDialog("info", "Campeón añadido con éxito.", 2000);
      this.nCampeon = new Campeon();
    }, err => {
        this.notificationService.showDialog("error", "Ups, algo salió mal.", 3000);
 });
  }
}
