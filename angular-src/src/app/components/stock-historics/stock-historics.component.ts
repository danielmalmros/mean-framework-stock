import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { StockService } from '../../services/stock.service';
import { Router, ActivatedRoute, Params} from '@angular/router';

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
    this.stockService.getStockHistorics(this.paramId).subscribe(stocks => {
      this.stocks = stocks;
      console.log(stocks);
      
    }, err => {
      console.log(err);
      return false
    })
  }

}
