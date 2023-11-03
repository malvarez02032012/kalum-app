import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CarreraTecnicaService } from 'src/app/modules/shared/services/carrera-tecnica.service';
import Swal from 'sweetalert2';
import { throwError, catchError } from 'rxjs';

@Component({
  selector: 'app-form-carrera-tecnica',
  templateUrl: './form-carrera-tecnica.component.html',
  styleUrls: ['./form-carrera-tecnica.component.css']
})

export class FormCarreraTecnicaComponent implements OnInit {
  headers:any;
  body:any;

  public carreraTecnicaFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private carreraTecnicaServices: CarreraTecnicaService,
    private dialogoRef: MatDialogRef<FormCarreraTecnicaComponent>) {
    this.carreraTecnicaFormGroup = this.formBuilder.group({
      nombre: ['', Validators.required]
    })
  }


  ngOnInit(): void {

  }

  // onSave() {
  //   let data = {
  //     nombre: this.carreraTecnicaFormGroup.get("nombre")?.value
  //   }

  //   this.carreraTecnicaServices.addCarreraTecnica(data)
  //     .subscribe(response => {
  //     console.log(response);


  //       // if (response.carreraId != null) 
  //       // {
  //       //   Swal.fire({
  //       //     icon: 'success',
  //       //     title: 'Carreras Técnicas',
  //       //     text: `Se agrego correctamente la carrera ${response.nombre}`,
  //       //     footer: '<a href="">kalum v1.0.0</a>'
  //       //   }).then(result => {
  //       //     if (result.isConfirmed) {
  //       //       this.dialogoRef.close(1);
  //       //     }
  //       //   })
  //       // }
  //       // else if (response.error.httpStatusCode == 503 || response.status == 500) {
  //       //   this.dialogoRef.close(2);
  //       // }
  //   });
  // }

  onSave() {
    let data = {
      nombre: this.carreraTecnicaFormGroup.get("nombre")?.value
    }

    this.carreraTecnicaServices.addCarreraTecnica(data)
      // resp is of type `HttpResponse<Config>`
    .subscribe(resp => {
      console.log("res", resp);
      
      if (resp.status==200 || resp.status==201) 
        {
          Swal.fire({
            icon: 'success',
            title: 'Carreras Técnicas',
            text: `Se agrego correctamente la carrera ${resp.body.nombre}`,
            footer: '<a href="">kalum v1.0.0</a>'
          }).then(result => {
            if (result.isConfirmed) {
              this.dialogoRef.close(1);
            }
          })
        }
        else if (resp.status == 503 || resp.status == 500) 
        {
          console.log(resp.status);
          this.dialogoRef.close(2);
        }
    });
  }

  onCancel() {
    this.dialogoRef.close(3);
  }

  private handleError(error: any) {
    let errorMessage = 'Error desconocido';
    if (error.error instanceof ErrorEvent) {
      // Error del cliente, como la red está caída
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // El servidor devolvió un código de error
      errorMessage = `Código de error: ${error.status}\nMensaje: ${error.message}`;
    }

    // Swal.fire({
    //       icon: 'error',
    //       title: 'Carreras Técnicas',
    //       text: `Se genero el siguiente error al procesar la transacción: ${error.message}`,
    //       footer: '<a href="">kalum v1.0.0</a>'
    // });

    // Devuelve un observable con un mensaje de error
    return throwError(errorMessage);
  }
}