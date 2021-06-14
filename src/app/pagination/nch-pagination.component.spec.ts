import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NchPaginationComponent } from './nch-pagination.component';

describe('NchPaginationComponent', () => {
  let component: NchPaginationComponent;
  let fixture: ComponentFixture<NchPaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NchPaginationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NchPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
