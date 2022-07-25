import { Component, Input, OnInit } from '@angular/core';
import { COINS } from '../../helper/const';
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-coin-stack',
  templateUrl: './coin-stack.component.html',
  styleUrls: ['./coin-stack.component.scss'],
})
export class CoinStackComponent implements OnInit {

  @Input() coins: any = [];
  common_url = environment.ICON_URL;
  COINS = this.coins;
  @Input() coinList: any;
  @Input() packageList: any;
  constructor() { }

  ngOnInit() {
  }

}
