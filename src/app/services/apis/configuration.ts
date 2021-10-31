import { environment } from "src/environments/environment";


export class ApiConfiguration {
    protected baseUrl: string = environment.baseUrl;

    public register = `authentication/register`;
    public login = `authentication/login`;
}

