import { Component, OnInit } from '@angular/core';
import { StockService } from '../../services/stock.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  stockName: String;
  stockDescription: String;
  stockValue: Number;

  constructor(
    private stockService: StockService,
    private router: Router,
    private flashMessages: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onAddStock() {
    const stock = {
      stockName: this.stockName,
      stockDescription: this.stockDescription,
      stockValue: this.stockValue
    }

    this.stockService.addStock(stock).subscribe(data => {
      if (data.success) {
        this.flashMessages.show('Your stock is added!', { cssClass: 'alert-success', timeout: 3000 })
        this.stockService.sendMsg(stock);
        this.router.navigate(['/']);
      } else {
        this.flashMessages.show('Something went wrong!', { cssClass: 'alert-danger', timeout: 3000 })
        this.router.navigate(['/dashboard']);
      }
    });
  }
}
