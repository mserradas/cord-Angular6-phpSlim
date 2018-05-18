import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest } from '@angular/common/http';
import * as environment from '../../environments/environment.prod';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class VendedorService {

  private url;

  constructor(
    public http: HttpClient) {
    this.url = environment.environment.apiUrl;
  }

  getVendedores() {
    return this.http.get(this.url + `/vendedores`, httpOptions);
  }

  getVendedorDetalle(id) {
    return this.http.get(this.url + `/vendedor/` + id, httpOptions);
  }

  vendedorCreate(vendedor) {
    return this.http.post(this.url + `/vendedor-crear`, vendedor, httpOptions);
  }

  vendedorUpdate(id, vendedor) {
    return this.http.put(this.url + `/vendedor-actualizar/` + id, vendedor, httpOptions);
  }

  vendedorDelete(id) {
    return this.http.get(this.url + `/vendedor-eliminar/` + id, httpOptions);
  }

}
