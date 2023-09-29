import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamenesAdmisionComponent } from './components/examenes-admision/examenes-admision.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [
    ExamenesAdmisionComponent
  ],
  imports: [
    CommonModule,

    RouterModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ]
})
export class ExamenesAdmisionModule { }
