import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { StockService } from '../../services/stock.service';
import { Router, ActivatedRoute, Params} from '@angular/router';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-stock-historics',
  templateUrl: './stock-historics.component.html',
  styleUrls: ['./stock-historics.component.css']
})
export class StockHistoricsComponent implements OnInit {
  stocks: Object;
  paramId: String;
  
  constructor(
    private router: Router,
    private stockService: StockService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.paramId = params.get('stockId')
    });
  }

  ngOnInit() {
    this.getStockHistorics();
    
    var socket = io('http://localhost:3000');
    socket.on('Update', () => this.getStockHistorics());
  }

  getStockHistorics() {
    this.stockService.getStockHistorics(this.paramId).subscribe(stocks => {
      this.stocks = stocks;
    }, err => {
      console.log(err);
      return false
    })
  }

}
