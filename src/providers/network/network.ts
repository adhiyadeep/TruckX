import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
/*
  Generated class for the NetworkProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NetworkProvider {

  constructor(public http: HttpClient) {
    console.log('Hello NetworkProvider Provider');
  }

  apiPath= "http://suyogtravels.com/"
  loginAPI  = "https://reqres.in/api/login";
  addDrivers = this.apiPath+"addDriver.php";
  getDrivers = this.apiPath+"getDrivers.php";
  editDrivers=this.apiPath+"editDriver.php"
  

  authenticate(data): Observable<any> {
    return this.http.post(this.loginAPI, data, { responseType: 'json' })
      .catch(this.errorHandler);
  }

  addDriver(data): Observable<any> {
    return this.http.post(this.addDrivers, data, { responseType: 'text' })
      .catch(this.errorHandler);
  }

  getDriver() : Observable<any>
  {
    return this.http.get(this.getDrivers, { responseType: 'json' })
      .catch(this.errorHandler);
  }
  editDriver(data):Observable<any>
  {
    return this.http.post(this.editDrivers,data, { responseType: 'text' })
    .catch(this.errorHandler);
  }

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "Server Error");
  }


}
