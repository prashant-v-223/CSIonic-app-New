import { Component, Input, OnInit } from '@angular/core';
import { COINS } from '../../helper/const';

@Component({
  selector: 'app-coin-stack',
  templateUrl: './coin-stack.component.html',
  styleUrls: ['./coin-stack.component.scss'],
})
export class CoinStackComponent implements OnInit {

  @Input() coins: any = [];

  COINS = COINS;

  constructor() { }

  ngOnInit() {}

}
