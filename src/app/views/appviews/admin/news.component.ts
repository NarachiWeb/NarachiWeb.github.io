import { Component } from '@angular/core';

import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'news',
  templateUrl: 'news.template.html'
})
export class NewsComponent {


  constructor(private notificationService: NotificationService) {
  }

  ngOnInit() {

  }


}
