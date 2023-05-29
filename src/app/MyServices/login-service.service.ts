import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginServiceService {
  url = 'https://localhost:7185/api/';
  BaseUrl = 'http://45.76.7.187:74/api/User'
  constructor(private http: HttpClient) { }
  verifyProfile(data: any): Observable<any> {
    return this.http.post<any>(this.BaseUrl, data);
  }
  storeId(idValue: any) {
    sessionStorage.setItem('Id', idValue);
  }
  getId() {
    return sessionStorage.getItem('Id');
  }
}
