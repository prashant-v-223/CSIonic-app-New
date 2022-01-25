import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
@Injectable()
export class ApiConfiguration {
    protected baseUrl: string = environment.baseUrl;

    public register = `authentication/register`;
    public login = `authentication/login`;
    public bankAccount = `bank/account`;
    public user = `auth/user`;

}

