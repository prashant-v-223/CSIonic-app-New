
import { apiUrl } from '../../configuration/api';

export class ApiConfiguration {
  protected baseUrl: string = apiUrl;

  public register = `authentication/register`;
  public login = `authentication/login`;
}

