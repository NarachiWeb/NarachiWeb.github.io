import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaginationParams } from '../models/PaginationParams';

@Component({
  selector: 'nch-pagination',
  templateUrl: './nch-pagination.component.html',
  styleUrls: ['./nch-pagination.component.css']
})
export class NchPaginationComponent implements OnInit {

  @Input() Grid: any;
  @Output() getPage = new EventEmitter<PaginationParams>();
  



  constructor() { }

  ngOnInit() {}

  changePage(params: PaginationParams) {
    this.getPage.emit(params);
  }

}
