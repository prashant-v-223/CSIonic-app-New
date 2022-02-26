import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { NavController } from '@ionic/angular';
import { UserService } from '../shared/services/user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    token: any;
    
    constructor(
        private router: Router,
        public navCtrl: NavController,
        private userService: UserService
    ) {}

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
        if (this.token) {
            return true;
        }
        this.token = await this.userService.setHeaderToken();

        if (this.token)
            return true;
        
        return this.router.parseUrl('/login');
    }
}
