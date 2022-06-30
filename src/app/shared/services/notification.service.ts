import { Injectable } from '@angular/core';
import { PushNotifications, Token } from '@capacitor/push-notifications';
import { ApiCallService } from 'src/app/services/apis/api-call.service';
import { ApiConfiguration } from 'src/app/services/apis/configuration';
import { Notification } from '../types/notification';
import { Capacitor } from '@capacitor/core';

enum PushNotificationError {
  PERMISSION_NOT_GRANTED
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private api: ApiCallService,
    private apiConfig: ApiConfiguration
  ) {
    const isPushNotificationsAvailable = Capacitor.isPluginAvailable('PushNotifications');
     
    if (isPushNotificationsAvailable) {
      this.listenForNotifications();
    }
  }

  getPushNotificationToken() {
    return new Promise((resolve, reject) => {

      // Request permission to use push notifications
      PushNotifications.requestPermissions().then(result => {
        if (result.receive === 'granted') {
          // Register with Apple / Google to receive push via APNS/FCM
          PushNotifications.register();
        } else {
          // Show some error
          reject(PushNotificationError.PERMISSION_NOT_GRANTED);
        }
      });

      // On success, we should be able to receive notifications
      PushNotifications.addListener('registration',
        (token: Token) => {
          console.log('Push registration success, token: ' + token.value, token);
          resolve(token.value);
          // TODO: call an API to save th device token in DB
        }
      );

      // Some issue with our setup and push will not work
      PushNotifications.addListener('registrationError',
        (error: any) => {
          reject(error);
          console.error('Error on registration: ' + JSON.stringify(error), error);
        }
      );

    });
  }

  async listenForNotifications() {
    await PushNotifications.addListener('pushNotificationReceived', notification => {
      console.log('Push notification received: ', notification);
      // TODO: show the red mark indicating unread messaged when app is open
    });

    await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
      console.log('Push notification action performed', notification.actionId, notification.inputValue);
      // TODO: redirect to notifications page directly based route
    });
  }

  getNotifications(): Promise<Notification[]> {
    return this.api.getData(`${this.apiConfig.notification}`);
  }

  getNotification(id: string): Promise<Notification> {
    return this.api.getData(`${this.apiConfig.notification}/${id}`);
  }
}
