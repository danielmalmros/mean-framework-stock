import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockRowComponent } from './stock-row.component';

describe('StockRowComponent', () => {
  let component: StockRowComponent;
  let fixture: ComponentFixture<StockRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
