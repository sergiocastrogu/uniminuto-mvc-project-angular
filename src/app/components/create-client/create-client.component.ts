import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Client } from 'src/app/models/clientsModel';
import { ClientType } from 'src/app/models/clientsTypeModel';
import { ClientsService } from 'src/app/services/clients.service';
import { ClientstypeService } from 'src/app/services/clientstype.service';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.scss']
})
export class CreateClientComponent implements OnInit {

  create_from!: FormGroup;
  clientModel!: Client;
  listClientType: ClientType[] = [];

  constructor(
    public dialogRef: MatDialogRef<CreateClientComponent>,
    private fb: FormBuilder,
    private clientTypeServices: ClientstypeService,
    private clientServices: ClientsService,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getListClientTypes();
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

  createForm(){
   this.create_from = this.fb.group(
    {
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      birthDate:  new FormControl(''),
      clientType: new FormControl(''),
    }
   )
  }

  save(){
    if(this.create_from.invalid){
      return;
    }
    let clientType: ClientType = this.create_from.get('clientType')?.value;
    this.clientModel = {
      id: 0,
      firstName: this.create_from.get('firstName')?.value,  
      lastName: this.create_from.get('lastName')?.value,  
      birthDate: this.create_from.get('birthDate')?.value,
      typeId: clientType.id,
      active: true,
    }

    this.clientServices.addClients(this.clientModel).subscribe({
      next: (data: Client)=> {
        this.dialogRef.close(data);
      },
      error: (error: HttpErrorResponse)=> {
        console.info(error);
      }
    })
  }

}
