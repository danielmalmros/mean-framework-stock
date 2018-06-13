import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  it('passes if stock is an array of objects', function() {

    // Waiting for data to be received from server
    setTimeout(() => {      
      let stocks = {};
      
      expect(stocks).toEqual(component.stocks);
    }, 100);
  });

  it('passes if stock length is > 0', function() {

    // Waiting for data to be received from server
    setTimeout(() => {      
      expect(component.stocks).toBeGreaterThan(1);
    }, 100);
  });

});
