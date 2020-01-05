import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  register(newUser: User){

    let formData = new FormData();
    formData.append('username', newUser.username);
    formData.append('email', newUser.email);
    formData.append('password', newUser.password);
    formData.append('birthDate', newUser.birthDate);
    formData.append('gender', newUser.gender);

    //API call the register a new user

  }
}
