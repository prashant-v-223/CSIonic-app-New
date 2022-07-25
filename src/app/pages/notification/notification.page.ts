import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { Notification } from 'src/app/shared/types/notification';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  isLoading = true;
  notifications: Notification[];

  constructor(
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.loadNotifications();
  }

  async loadNotifications() {
    try {
      this.notifications = await this.notificationService.getNotifications();
      this.notifications = this.notifications['data']['data'];
      this.isLoading = false;
    } catch (e) {
      console.error('Error in loading notification service');
    }
  }

}
