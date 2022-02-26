import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-plan-list',
  templateUrl: './plan-list.component.html',
  styleUrls: ['./plan-list.component.scss'],
})
export class PlanListComponent implements OnInit {

  @Input() planList: any[];
  @Input() viewType: string;

  constructor(
    private navCtrl: NavController
  ) { }

  ngOnInit() { }

  onSelectPlan(planId: string) {
    if (this.viewType === 'planList') {
      this.navCtrl.navigateForward('/choose-plan-frequency');
    } else {
      this.navCtrl.navigateForward(`/dashboard/sip-details/${planId}`);
    }
  }

}
