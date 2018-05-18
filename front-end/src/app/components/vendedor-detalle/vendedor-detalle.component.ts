import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { VendedorService } from '../../services/vendedor.service';
import { Vendedor } from '../../models/vendedor';
import { ToastrService } from 'ngx-toastr';
import { NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

const I18N_VALUES = {
  'es': {
    weekdays: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'],
    months: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  }
  // other languages you would support
};

@Injectable()
export class I18n {
  language = 'es';
}

@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {

  constructor(private _i18n: I18n) {
    super();
  }

  getWeekdayShortName(weekday: number): string {
    return I18N_VALUES[this._i18n.language].weekdays[weekday - 1];
  }
  getMonthShortName(month: number): string {
    return I18N_VALUES[this._i18n.language].months[month - 1];
  }
  getMonthFullName(month: number): string {
    return this.getMonthShortName(month);
  }

  getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.day}-${date.month}-${date.year}`;
  }
}


@Component({
  selector: 'app-vendedor-detalle',
  templateUrl: './vendedor-detalle.component.html',
  styleUrls: ['./vendedor-detalle.component.css'],
  providers: [I18n, {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n}]
})
export class VendedorDetalleComponent implements OnInit {

  id = '';
  public vendedor: Vendedor;
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
      this.vendedor = new Vendedor('', '', '', '', '', '', '', '', '', '0');
      this.delete = true;
    }
  }

  getVendedorDetalle() {
    this.vendedorService.getVendedorDetalle(this.id)
    .subscribe((response) => {
      this.VendedorForm.get = response['data'];
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
    console.log(this.VendedorForm.value);
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
