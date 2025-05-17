import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeleccionarServicioModalPage } from './seleccionar-servicio-modal.page';

describe('SeleccionarServicioModalPage', () => {
  let component: SeleccionarServicioModalPage;
  let fixture: ComponentFixture<SeleccionarServicioModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionarServicioModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
