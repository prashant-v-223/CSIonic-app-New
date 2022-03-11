import { AfterViewInit, Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { NavController } from '@ionic/angular';
import { PackagesService } from 'src/app/shared/services/packages.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardPage implements OnInit {

  showLoader = true;
  packageList: any[] = [];
  user: any;

  constructor(
    private packagesService: PackagesService,
    private userService: UserService
  ) {
    this.user = this.userService.getUserFromStorage();
  }
  
  ionViewWillEnter(): void {
    this.showLoader = true;
    this.getPackages();
  }

  ngOnInit() {}
  
  async getPackages() {
    try {
      const planListRes = await this.packagesService.getPackages();
      if (planListRes?.data?.data) {
        this.packageList = planListRes?.data?.data;
        this.showLoader = false;
      }
    } catch (e) {
      console.log('Error while getting packages list: ', e);
    }
  }

}
