import { Component, OnInit } from '@angular/core';
import { VendedorService } from '../../services/vendedor.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public vendedores: any = [];
  constructor(
    public vendedorService: VendedorService,
    private toaster: ToastrService) {}

  ngOnInit() {
    this.getVendedores();
  }

  getVendedores() {
    this.vendedorService.getVendedores()
    .subscribe( response => {
        this.vendedores = response['data'];
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
