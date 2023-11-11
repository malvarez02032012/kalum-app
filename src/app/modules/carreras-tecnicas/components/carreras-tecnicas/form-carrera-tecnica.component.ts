import { HttpResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
    private dialogoRef: MatDialogRef<FormCarreraTecnicaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.carreraTecnicaFormGroup = this.formBuilder.group({
      nombre: [data != null ? data.nombre : '', Validators.required]
    })
  }

  ngOnInit(): void {

  }

  onSave() {
    let dataForm = {
      carreraId: this.data.carreraId,
      nombre: this.carreraTecnicaFormGroup.get("nombre")?.value
    }

    if (this.data != null) {
      this.carreraTecnicaServices.updateCarreraTecnica(dataForm).subscribe({
        next: (data:any) =>  {
          Swal.fire({
            icon: 'success',
            title: 'Carreras Técnicas',
            text: `Se actualizo correctamente la carrera: ${dataForm.nombre}`,
            footer: '<a href="">kalum v1.0.0</a>'
          }).then((result) => {
            if (result.isConfirmed) {
              this.dialogoRef.close(1);
            }
          });
        },
        error: (error) => this.dialogoRef.close(2),
        complete: () => console.log('Proceso finalizado')
      })
    }
    else {
      this.carreraTecnicaServices.addCarreraTecnica(dataForm)
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

  }

  onCancel() {
    this.dialogoRef.close(3);
  }
}