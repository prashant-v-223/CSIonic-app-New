import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-package-card',
  templateUrl: './package-card.component.html',
  styleUrls: ['./package-card.component.scss'],
})
export class PackageCardComponent implements OnInit, OnChanges {

  @Input() view: 'package'|'coin' = 'package';
  @Input() package: any;
  @Input() navigationLink = '/';

  coins = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.package)
      this.populateCoins();
  }

  ngOnInit() {}

  populateCoins() {
    this.coins = this.package.coins.map(coin => coin.currencyId);
  }
}
