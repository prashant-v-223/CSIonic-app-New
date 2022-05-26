import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
@Injectable()
export class ApiConfiguration {
    protected baseUrl: string = environment.baseUrl;

    public configuration = `configuration`;

    public register = `authentication/register`;
    public login = `authentication/login`;
    public bankAccount = `bank/account`;
    public user = `auth/user`;
    public verifyProof = `user/id-proof`;
    public verifySelfie = `user/selfie`;

    public packages = 'packages';
    public sip = 'sip';
    public depositWithdrawalAmount = `transactions/amount/`;
    public transactionList = `transactions`;

    public referralCode = `referral`;

}

