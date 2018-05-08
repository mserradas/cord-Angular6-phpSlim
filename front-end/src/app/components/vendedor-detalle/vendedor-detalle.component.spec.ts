import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendedorDetalleComponent } from './vendedor-detalle.component';

describe('VendedorDetalleComponent', () => {
  let component: VendedorDetalleComponent;
  let fixture: ComponentFixture<VendedorDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendedorDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendedorDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
