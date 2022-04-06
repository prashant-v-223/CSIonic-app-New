import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import { Auth } from 'aws-amplify';

import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  
  user: any;

  constructor(
    private userService: UserService
  ) {
    this.user = this.userService.getUserFromStorage();
  }
  
  signOut() {
    this.userService.signOut();
  }
}
