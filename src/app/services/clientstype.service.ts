import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClientType } from '../models/clientsTypeModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientstypeService {
  
  constructor(private http:HttpClient) { }


  getListClientTypes() {
    return this.http.get<ClientType[]>(`${environment.api}/clientType/listClientType`);
  }
}
