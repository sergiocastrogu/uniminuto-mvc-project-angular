import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Client } from 'src/app/models/clientsModel';
import { ClientType } from 'src/app/models/clientsTypeModel';
import { ClientsService } from 'src/app/services/clients.service';
import { ClientstypeService } from 'src/app/services/clientstype.service';

@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.scss']
})
export class UpdateClientComponent implements OnInit {

  update_from!: FormGroup;
  clientModel!: Client;
  listClientType: ClientType[] = [];


  constructor(
    public dialogRef: MatDialogRef<UpdateClientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Client,
    private fb: FormBuilder,
    private clientTypeServices: ClientstypeService,
    private clientServices: ClientsService,
    private datePipe: DatePipe
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
    let clientType: ClientType = this.data.clientType? this.data.clientType: {id: 0, active: true, name: ''};
    this.update_from = this.fb.group(
     {
       firstName: new FormControl(this.data.firstName),
       lastName: new FormControl(this.data.lastName),
       birthDate:  new FormControl(this.data.birthDate),
       clientType: new FormControl(clientType.id),
     }
    )
   }

   save(){
    if(this.update_from.invalid){
      return;
    }
    this.clientModel = {
      id: this.data.id,
      firstName: this.update_from.get('firstName')?.value,  
      lastName: this.update_from.get('lastName')?.value,  
      birthDate: this.update_from.get('birthDate')?.value,
      typeId: this.update_from.get('clientType')?.value,
      active: true,
    }

    this.clientServices.updateClients(this.clientModel).subscribe({
      next: (data: Client)=> {
        this.dialogRef.close(data);
      },
      error: (error: HttpErrorResponse)=> {
        console.info(error);
      }
    })
  }

}
