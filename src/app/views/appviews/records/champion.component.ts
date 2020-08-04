import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Registro } from '../../../models/Registro';
import { RecordService } from '../../../services/record.service';


@Component({
  selector: 'champion',
  templateUrl: 'champion.template.html'
})
export class ChampionComponent {

  LoadingRecords = false;
  Registros = new Array<Registro>();
  Campeon: string;


  constructor(private activatedRoute: ActivatedRoute, private recordService: RecordService) {

  }

  ngOnInit() {


    this.activatedRoute.queryParams.subscribe(param => {

      let name = param["name"];

      if (name) {
        this.setName(name);
        
        this.LoadingRecords = true;
        this.recordService.GetRecordsByChampionName(name).subscribe(us => {

          var Result = JSON.parse(us.text());
          this.Registros = <Registro[]>Result;
          this.LoadingRecords = false;
        });


      }

    });


  }

  anyRecordEditing(): boolean {

    var record = this.Registros.find(x => x.Edit);
    return record != null;
  }


  setName(text: string): string {
    var campeon = text.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
    this.Campeon = campeon;
    return campeon;
  }
}


