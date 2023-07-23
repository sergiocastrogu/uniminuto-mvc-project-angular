import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/clientsModel';
import { ClientType } from 'src/app/models/clientsTypeModel';
import { ClientsService } from 'src/app/services/clients.service';
import { ClientstypeService } from 'src/app/services/clientstype.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateClientComponent } from 'src/app/components/create-client/create-client.component';
import { UpdateClientComponent } from 'src/app/components/update-client/update-client.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(
    private clientServices: ClientsService,
    private clientTypeServices: ClientstypeService,
    private dialog: MatDialog,
    private datePipe: DatePipe
  ) {}
  listClients: Client[] = [];
  listClientType: ClientType[] = [];
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  selectedClientType!: ClientType;
  defaultSelected: ClientType = {
    id: 0,
    name: 'Todos*',
    active: true,
  };

  ngOnInit(): void {
    this.getAllClients();
    this.getListClientTypes();
    this.selectedClientType = this.defaultSelected;
  }

  getListClientTypes() {
    this.clientTypeServices.getListClientTypes().subscribe({
      next: (listClientTypes: ClientType[]) => {
        this.listClientType = listClientTypes;
      },
      error: (error: any) => {
        console.info(error);
      },
    });
  }

  getAllClients() {
    this.clientServices.getAllClients().subscribe({
      next: (listClients: Client[]) => {
        this.listClients = listClients;
      },
      error: (error: any) => {
        console.info(error);
      },
    });
  }

  filterByRole() {
    if (!this.selectedClientType) {
      return;
    }
    if (this.selectedClientType.id == 0) {
      this.getAllClients();
      return;
    }
    this.clientServices.getClientsByRole(this.selectedClientType.id).subscribe({
      next: (listClients: Client[]) => {
        this.listClients = listClients;
      },
      error: (error: any) => {
        console.info(error);
      },
    });
  }

  createClient() {
    const dialogRef = this.dialog.open(CreateClientComponent, {
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.getAllClients();
      }
    });
  }

  updateClient(client: Client) {
    const dialogRef = this.dialog.open(UpdateClientComponent, {
      data: client
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.getAllClients();
      }
    });
  }

  deleteClient(idClient: number){
    this.clientServices.deleteClients(idClient).subscribe({
      next: (result: number) => {
        if(result == 1){
          this.getAllClients();
        }
      },
      error: (error: any) => {
        console.info(error);
      },
    });
  }

  
}
