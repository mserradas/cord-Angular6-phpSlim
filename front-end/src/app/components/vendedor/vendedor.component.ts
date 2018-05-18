import { Component, OnInit } from '@angular/core';
import { VendedorService } from '../../services/vendedor.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vendedor',
  templateUrl: './vendedor.component.html',
  styleUrls: ['./vendedor.component.css']
})
export class VendedorComponent implements OnInit {

  public vendedores: any = [];

  constructor(
    private vendedorService: VendedorService,
    private toaster: ToastrService) {}

  ngOnInit() {
    this.getVendedores();
  }

  getVendedores() {
    this.vendedorService.getVendedores()
    .subscribe( result => {
        this.vendedores = result['data'];
      },
      error => {
        if (error['status'] === 200) {
          console.log(<any>error);
          this.toaster.error('Error interno en el servidor, Acceso denegado', 'Conexión sin Exito', {
            closeButton: true,
            progressBar: true,
            });
        } else {
          console.log(<any>error);
        this.toaster.error('Error interno en el servidor, comunicar al administrador', 'Conexión sin Exito', {
          closeButton: true,
          progressBar: true,
          });
        }
        }
    );
  }

}
