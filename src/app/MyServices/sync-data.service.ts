import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SyncDataService {
  url = 'https://localhost:7185/api/Module';
  syncUrl = 'https://localhost:7185/api/SyncStatus/GetSyncStatus?UID=';
  constructor(private http: HttpClient) {}
  getSyncData(id: any): Observable<any> {
    return this.http.get(`${this.url}?UserID=${id}`);
  }
  syncStatus(Uid: any): Observable<any> {
    return this.http.get(`${this.syncUrl}${Uid}`);
  }
  saveSyncStatus(data: any, Id: any): Observable<any> {
    return this.http.post(`${this.url}?UserID=${Id}`, data);
  }
}
