import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  url = 'https://localhost:7185/api/'
  constructor(private http:HttpClient) { }
  verifyProfile(data: any) :Observable<any>{
  console.log('DAta',data)
    return this.http.post<any>(this.url + 'Login', data);
  }
  storeId(idValue:any){
    console.log(idValue)
    sessionStorage.setItem('Id',idValue)
    }
    getId(){
      return sessionStorage.getItem('Id')
    }
}
