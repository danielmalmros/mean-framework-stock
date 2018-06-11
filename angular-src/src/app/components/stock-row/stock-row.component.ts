import { Component, OnInit, Input } from '@angular/core';
import { StockService } from '../../services/stock.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: '[app-stock-row]',
  templateUrl: './stock-row.component.html',
  styleUrls: ['./stock-row.component.css']
})
export class StockRowComponent implements OnInit {


  stocks: Object;
  newValue: Object;
  newestValue: Number;

  @Input() stockItem: {
    _id: String,
    stockHistorics: [{
      stockValue: Number;
    }]
  };
  @Input() index: String;

  constructor(
    private stockService: StockService,
    private authService: AuthService,
    private router: Router,
    private flashMessages: FlashMessagesService
  ) { }

  ngOnInit() {
    this.newestValue = this.stockItem.stockHistorics[this.stockItem.stockHistorics.length - 1].stockValue;
  }

  onDeleteStock(stockId) {

    this.stockService.deleteStock(stockId).subscribe(data => {
      if (data.success) {
        this.flashMessages.show('Your stock is deleted!', { cssClass: 'alert-success', timeout: 3000 })
      } else {
        this.flashMessages.show('Something went wrong!', { cssClass: 'alert-danger', timeout: 3000 })
        this.router.navigate(['/dashboard']);
      }
    });
  }

  onUpdateStock() {
    this.newValue = {
      "stockValue": this.newestValue
    }

    this.stockService.updateStock(this.stockItem._id, this.newValue).subscribe(data => {
      if (data.success) {
        this.flashMessages.show('Your stock is updated!', { cssClass: 'alert-success', timeout: 3000 })
        this.stockService.getStocks().subscribe(data => {
          this.stocks = data;
        })
      } else {
        this.flashMessages.show('Something went wrong!', { cssClass: 'alert-danger', timeout: 3000 })
        this.router.navigate(['/dashboard']);
      }
    });
  }
}
