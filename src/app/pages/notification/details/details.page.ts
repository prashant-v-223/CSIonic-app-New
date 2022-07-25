import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController } from '@ionic/angular';

import { NotificationService } from 'src/app/shared/services/notification.service';
import { Notification } from 'src/app/shared/types/notification';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  isLoading = true;
  id: string;
  notification: Notification;

  constructor(
    private activateRoute: ActivatedRoute,
    private navCtrl: NavController,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.activateRoute.params.subscribe((params: Params) => {
      this.id = params.id;

      if (!this.id)
        this.goBack();

      this.loadDetails();
    });
  }

  async loadDetails() {
    try {
      this.notification = await this.notificationService.getNotification(this.id);
      this.isLoading = false;
    } catch (e) {
      console.error('Error in loading notification service');
    }
  }

  goBack() {
    this.navCtrl.navigateBack('/notification');
  }

}
