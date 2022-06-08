import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-early-access',
  templateUrl: './early-access.page.html',
  styleUrls: ['./early-access.page.scss'],
})
export class EarlyAccessPage implements OnInit {

  constructor(private userService:UserService) { }

  ngOnInit() {
   /*  setTimeout(() => {
      this.signOutUser();
    }, 5000); */
  }

  /* signOutUser()
  {
    this.userService.signOut();
  } */
}
