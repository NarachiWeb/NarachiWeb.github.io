import { Component } from '@angular/core';

import { DataService } from '../../../services/data.service';
import { DataRegistro } from '../../../models/DataRegistro';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'records',
  templateUrl: 'records.template.html'
})
export class RecordsComponent {

  DataRecord = new DataRegistro();

  constructor(private dataService: DataService, private notificationService: NotificationService) {
  }

  ngOnInit() {

    this.getDataRecords();
  }

  getDataRecords() {
    this.dataService.getDataRecords().subscribe(us => {

      this.DataRecord = <DataRegistro>JSON.parse(us.text());

    },

      error => {
        this.notificationService.showDialog("error", "Hubo un problema al intentar recuperar los datos.", 4000);

      }
    )
  }


}
