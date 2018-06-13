import { Component, OnInit } from '@angular/core';
import { StockService } from '../../services/stock.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  stocks: Object;

  constructor(
    private stockService: StockService,
    private authService: AuthService,
    private router: Router,
    private flashMessages: FlashMessagesService
  ) { }

  ngOnInit() {
    this.getStocks();
    
    // Make sure we have a connection to the server
    var socket = io('http://localhost:3000');
    socket.on('Update', () => this.getStocks());
  }


  getStocks() {
    console.log('Subscribe to service');
    this.stockService.getStocks()
      .subscribe(
        stocks => {
          this.stocks = stocks;
        },
        error =>  console.log(error)
      );
  }

}
