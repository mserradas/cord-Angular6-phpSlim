import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { VendedorService } from '../../services/vendedor.service';
import { Vendedor } from '../../models/vendedor';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vendedor-detalle',
  templateUrl: './vendedor-detalle.component.html',
  styleUrls: ['./vendedor-detalle.component.css']
})
export class VendedorDetalleComponent implements OnInit {

  id = '';
  public vendedor: {};
  public delete: any = false;
  public VendedorForm: FormGroup;
  public formErrors;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toaster: ToastrService,
    private vendedorService: VendedorService,
    private formBuilder: FormBuilder) {
      this.id = this.route.snapshot.params['id'];
    }

  ngOnInit() {

    this.formErrors = {
      nombres: {},
      apellidos: {},
      fecha_nacimiento: {},
      tipo_identidad: {},
      identidad: {},
      direccion: {},
      telefono: {},
      genero: {},
      correo: {},
      ventas: {},
    };

    this.VendedorForm = this.formBuilder.group({
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      fecha_nacimiento: ['', [Validators.required]],
      tipo_identidad: ['', [Validators.required]],
      identidad: ['', [Validators.required, Validators.maxLength(9)]],
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      correo: ['', [Validators.email, Validators.required]],
      ventas: ['', [Validators.required]]
    });

    this.VendedorForm.valueChanges.subscribe(() => {
      this.onFormValuesChanged();
    });

    if (this.id !== 'new') {
      this.getVendedorDetalle();
    } else {
      this.vendedor = {};
      this.delete = true;
    }
  }

  getVendedorDetalle() {
    this.vendedorService.getVendedorDetalle(this.id)
    .subscribe((response) => {
       this.vendedor = response['data'];
    },
      error => { console.log(<any>error);
      }
    );
  }

  vendedorUpdate() {
    if (this.id !== 'new') {
    this.vendedorService.vendedorUpdate(this.id, this.vendedor)
    .subscribe((response) => {
      if (response['code'] === 200) {
        this.toaster.success('Operación Correcta', 'Vendedor Editado', {
          closeButton: true,
          progressBar: true,
        });
        this.router.navigate(['/vendedor']);
      } else {
        this.toaster.error('Operación Incorrecta', 'Vendedor No puede ser Editado', {
          closeButton: true,
          progressBar: true,
        });
      }
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
    } else {
      this.vendedorCreate();
    }
  }

  vendedorCreate() {
    this.vendedorService.vendedorCreate(this.vendedor)
      .subscribe((response) => {
        if (response['code'] === 200) {
          this.toaster.success('Operación Correcta', 'Vendedor Creado', {
            closeButton: true,
            progressBar: true,
          });
          this.router.navigate(['/vendedor']);
        } else {
          this.toaster.error('Operación Incorrecta', 'Vendedor No puede ser Creado', {
            closeButton: true,
            progressBar: true,
          });
        }
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

  vendedorDelete() {
    const eliminar = confirm('¿Deseas eliminar este registro?');
    if (eliminar) {
      this.vendedorService.vendedorDelete(this.id)
      .subscribe( response => {
        if (response['code'] === 200) {
          this.toaster.success('Operación Correcta', 'Vendedor Eliminado', {
            closeButton: true,
            progressBar: true,
          });
          this.router.navigate(['/vendedor']);
        } else {
          this.toaster.error('Operación Incorrecta', 'Vendedor No puede ser eliminado', {
            closeButton: true,
            progressBar: true,
          });
        }
      }, error => {
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

  onFormValuesChanged() {
    for (const field in this.formErrors) {
      if (!this.formErrors.hasOwnProperty(field)) {
        continue;
      }

      // Clear previous errors
      this.formErrors[field] = {};

      // Get the control
      const control = this.VendedorForm.get(field);

      if (control && control.dirty && !control.valid) {
        this.formErrors[field] = control.errors;
      }
    }
  }

}
