import { Injectable } from '@angular/core';
import { Client } from '../models/clientsModel';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  
  constructor(private http: HttpClient) { }
  
  
  getAllClients() {
    return this.http.get<Client[]>(`${environment.api}/client/listClients`);
  }

  getClientsByRole(roleId: number) {
    return this.http.get<Client[]>(`${environment.api}/client/listClientsByRole/${roleId}`);
  }

  addClients(data: Client) {
    return this.http.post<Client>(`${environment.api}/client/save-client`, data);
  }
  
  deleteClients(clientId: number){
    return this.http.delete<number>(`${environment.api}/client/delete-client/${clientId}`);
  }

  updateClients(client : Client){
    return this.http.put<Client>(`${environment.api}/client/update-client`, client)
  }

}
