import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { ApiConfiguration } from './configuration';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService extends ApiConfiguration {

  token: any = {};
  uploadSub = new BehaviorSubject<any>(0);

  constructor(private http: HttpClient) {
    super();
    const token = localStorage.getItem('token');
    this.token = token ? token : null;
    // console.log('token', this.token);
  }

  setHeaderToken(token) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  getHeader() {
    return {
      headers: {
        Authorization: this.token
      }
    };
  }

  public getData(subUrl: string, token = true): Promise<any> {
    return new Promise((resolve, reject) => {
      const request: string = this.baseUrl + subUrl;
      // console.log('data', request);
      this.http
        .get(request,
          token ? this.getHeader() : {})
        .subscribe(
          data => resolve(data),
          error => reject(error)
        );
    });
  }

  public postData(subUrl: string, data: any, token = true): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log('Token :', token);
      console.log('Data :', this.getHeader());
      const request: string = this.baseUrl + subUrl;
      this.http.post(request, data, token ? this.getHeader() : {})
        .subscribe(
          res => {
            resolve(res);
          },
          error => {
            console.log('Main Error :', error);
            reject(error);
          }
        );
    });
  }

  public putData(subUrl: string, data: any, token = true): Promise<any> {
    return new Promise((resolve, reject) => {
      const request: string = this.baseUrl + subUrl;
      this.http
        .put(request,
          data,
          token ? this.getHeader() : {})
        .subscribe(
          res => resolve(res),
          error => reject(error)
        );
    });
  }

  public deleteData(subUrl: string, token = true): Promise<any> {
    return new Promise((resolve, reject) => {
      const request: string = this.baseUrl + subUrl;
      this.http
        .delete(request,
          token ? this.getHeader() : {})
        .subscribe(
          res => resolve(res),
          error => reject(error)
        );
    });
  }

  public upload(file: any, url: any, token = true): Promise<any> {
    console.log('url', url);

    return new Promise((resolve, reject) => {
      const uploadData = new FormData();
      uploadData.append('myFile', file, file.name);
      this.uploadSub.next(0);
      const request = this.http
        .post(url,
          uploadData,
          token ? { ...this.getHeader(), reportProgress: true, observe: 'events' } : { reportProgress: true, observe: 'events' })
        .subscribe((event) => {
          if (event.type === HttpEventType.UploadProgress) {
            /* console.log('Upload Progress :', (event['loaded'] / event['total']) * 100 + '%'); */
            console.log('Event :', event['loaded'], event['total']);
            if (this.uploadSub.value !== null) {
              this.uploadSub.next((event['loaded'] / event['total']) * 100);
            } else {
              // Here Stop Uploading Request Manually
              request.unsubscribe();
            }
          } else if (event.type === HttpEventType.Response) {
            resolve(event.body);
          }
        },
          error => reject(error)
        );
    });
  }
}
