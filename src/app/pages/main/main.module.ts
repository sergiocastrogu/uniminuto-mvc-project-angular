import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MainComponent } from './main.component';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/components/shared.module';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    MatSelectModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatFormFieldModule
  ], 
  providers: [
    DatePipe
  ]
})
export class MainModule { }
