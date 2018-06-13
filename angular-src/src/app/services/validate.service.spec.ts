// import {describe, it, expect, injectAsync, beforeEachProviders } from 'angular2/testing';
// import { StockService } from './stock.service';
// import { Observable } from 'rxjs/Rx';
// import { Http, Headers } from '@angular/http';

// describe('Observable tests', () => {
  
//   beforeEachProviders( () => [Http, StockService] );
  
//   it('retrieves the people list', injectAsync( [StockService], (service) => {
//     //added some delay to make the test reproduceable on each request
//      return service.getStocks().delay(1000).toPromise()
//         .then( ( stocks ) => { expect(stocks.length).toBeGreaterThan(0) } );
//   } ) ); 
   
//   it('tests a dummy Observable', injectAsync( [], () => { 
//      return Observable.of(5).delay(2000).toPromise()
//         .then( ( val ) => { expect(val).toEqual(5) } );
//   } ) );
  
// }) 