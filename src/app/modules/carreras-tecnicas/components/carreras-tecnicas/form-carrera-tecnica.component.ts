import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CarreraTecnicaService } from 'src/app/modules/shared/services/carrera-tecnica.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-carrera-tecnica',
  templateUrl: './form-carrera-tecnica.component.html',
  styleUrls: ['./form-carrera-tecnica.component.css']
})

export class FormCarreraTecnicaComponent implements OnInit {
  headers: any;
  body: any;

  public carreraTecnicaFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private carreraTecnicaServices: CarreraTecnicaService,
    private dialogoRef: MatDialogRef<FormCarreraTecnicaComponent>) {
    this.carreraTecnicaFormGroup = this.formBuilder.group({
      nombre: ['', Validators.required]
    })
  }

  ngOnInit(): void {

  }

 

  onSave() {
    let data = {
      nombre: this.carreraTecnicaFormGroup.get("nombre")?.value
    }

    this.carreraTecnicaServices.addCarreraTecnica(data)
      .subscribe({
        next: (response: any) => {
          Swal.fire({
            icon: 'success',
            title: 'Carreras Técnicas',
            text: `Se agrego correctamente la carrera: ${response.nombre}`,
            footer: '<a href="">kalum v1.0.0</a>'
          }).then((result) => {
            if (result.isConfirmed) {
              this.dialogoRef.close(1);
            }
          });
        },// fin next
        error: err => {
          console.log("error: ", err);
          if (err.error.httpStatusCode == 503 || err.error.httpStatusCode == 500) {
            Swal.fire({
              icon: 'error',
              title: 'Carreras Técnicas',
              text: `Se ha generado error al consumir el servicio, contacte al administrador del sistema ${err.statusText}`,
              footer: '<a href="">kalum v1.0.0</a>'
            }).then((result) => {
              if (result.isConfirmed) {
                this.dialogoRef.close(3);
              }
            });
          }
        }//fin error
      });
  }

  onCancel() {
    this.dialogoRef.close(3);
  }
}