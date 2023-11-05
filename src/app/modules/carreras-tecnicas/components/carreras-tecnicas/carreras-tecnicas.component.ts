import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CarreraTecnica } from '../../model/carrera-tecnica.model';
import { CarreraTecnicaService } from 'src/app/modules/shared/services/carrera-tecnica.service';
import { CarrerasTecnicasModule } from '../../carreras-tecnicas.module';
import { MatPaginator } from '@angular/material/paginator';
import { FormCarreraTecnicaComponent } from './form-carrera-tecnica.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { iif } from 'rxjs';

@Component({
  selector: 'app-carreras-tecnicas',
  templateUrl: './carreras-tecnicas.component.html',
  styles: [
  ]
})
export class CarrerasTecnicasComponent implements OnInit {

  displayColumns: string[] = ['carreraId', 'nombre', 'acciones'];
  dataSource = new MatTableDataSource<CarreraTecnica>();

  ngOnInit(): void {
    this.getCarrerasTecnicas();
  }

  @ViewChild(MatPaginator)
  paginador !: MatPaginator;

  constructor(private carreraTecnicaService: CarreraTecnicaService, public dialog: MatDialog) {

  }

  getCarrerasTecnicas() {
    const data = this.carreraTecnicaService.getCarreras().subscribe({
      next: response => {
        this.processCarrerasTecnicasResponse(response);
      },
      error: err => {
        console.log(err.status);

        Swal.fire({
          icon: 'error',
          title: 'Carreras Técnicas x',
          text: `No se pudo cargar las carreras, consulte al administrador: ${err.status !='0'? err.error.message: err.message}`,
          footer: '<a href="">kalum v1.0.0</a>'
        });
      }
    });
  }

  isObjectEmpty(objectName: any) { return Object.keys(objectName).length === 0 && objectName.constructor === Object; }

  processCarrerasTecnicasResponse(data: any) {
    const dataCarreraTecnica: CarreraTecnica[] = [];
    let listaCarreraTecnica = data;
    listaCarreraTecnica.forEach((elemento: CarreraTecnica) => {
      dataCarreraTecnica.push(elemento);

    });

    this.dataSource = new MatTableDataSource<CarreraTecnica>(dataCarreraTecnica)
    this.dataSource.paginator = this.paginador;
  }

  openFormCarreraTecnica() {
    const dialogRef = this.dialog.open(FormCarreraTecnicaComponent, { width: '450px' });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.getCarrerasTecnicas();
      }
      // else
      //   if (result == 2) {
      //     Swal.fire('Carreras Técnicas', 'Ups!!!, se genero un error al momento de crear el curso', 'error')
      //   }
    }
    );
  }
}
