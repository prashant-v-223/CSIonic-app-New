import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { ApiCallService } from './api/api-call.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: User;

  constructor(
    private apiCallService: ApiCallService
  ) { }

  setUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): User {
    return JSON.parse(localStorage.getItem('user')) as User;
  }

  login(credential: { email: string, password: string }): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiCallService.postData(this.apiCallService.login, credential, false)
        .then(res => {
          console.log('login service', res);
          if (res.status === 'SUCCESS') {
            this.apiCallService.setHeaderToken(res.data.token);
            localStorage.setItem('user', res.data.user);
            resolve(res);
          }
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  }

  register(newUser: User): Promise<any> {
    return this.apiCallService.postData(this.apiCallService.register, newUser, false);
  }
}
