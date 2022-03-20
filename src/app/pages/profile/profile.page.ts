import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Auth } from 'aws-amplify';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  
  user: any;

  constructor(
    private navCtrl: NavController,
    private userService: UserService
  ) {
    this.user = this.userService.getUserFromStorage();
  }

  ngOnInit() {
  }
  
  signOut() {
    localStorage.clear();
    setTimeout(async () => {
      await Auth.signOut({
        global: true
      });
      this.navCtrl.navigateRoot('/sign-in');
    }, 500);
  }
}
