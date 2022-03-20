import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Auth } from 'aws-amplify';
import { UserService } from '../shared/services/user.service';

@Injectable({
    providedIn: 'root'
})
export class NonAuthGuard implements CanActivate {
    token: any;
    
    constructor(
        private router: Router,
        public navCtrl: NavController,
        private userService: UserService
    ) {}

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
        try {
            await Auth.currentAuthenticatedUser();
            if (this.userService.getUserFromStorage())
                return this.router.parseUrl('/tabs/dashboard');
            return true;
        } catch (e) {
            return true;
        }
    }
}
