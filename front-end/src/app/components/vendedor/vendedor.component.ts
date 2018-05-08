import { Component, OnInit } from '@angular/core';
import { VendedorService } from '../../services/vendedor.service';

@Component({
  selector: 'app-vendedor',
  templateUrl: './vendedor.component.html',
  styleUrls: ['./vendedor.component.css']
})
export class VendedorComponent implements OnInit {

  private vendedores: any = [];

  constructor(
    private vendedorService: VendedorService) {}

  ngOnInit() {
    this.getVendedores();
  }

  getVendedores() {
    this.vendedorService.getVendedores()
    .subscribe(
      result => {
        this.vendedores = result;
      },
      error => { console.log(<any>error);
      }
    );
  }

}
