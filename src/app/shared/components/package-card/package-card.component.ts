import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-package-card',
  templateUrl: './package-card.component.html',
  styleUrls: ['./package-card.component.scss'],
})
export class PackageCardComponent implements OnInit, OnChanges {

  @Input() view: 'package'|'sip'|'coin' = 'package';
  @Input() package: any;
  @Input() navigationLink = '/';
  @Input() coinList: any;
  @Input() packageList: any;

  coins = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.package)
      this.populateCoins();
  }

  get packageObj() {
    return ['package', 'coin'].includes(this.view) ? this.package : this.package.packageId;
  }

  ngOnInit()
  {
    this.packageList;
    this.coinList;
  }

  populateCoins() {
    this.coins = this.packageObj.coins.map(coin => coin.currencyId);
  }
}
