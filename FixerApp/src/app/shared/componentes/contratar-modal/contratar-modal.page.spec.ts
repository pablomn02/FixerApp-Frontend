import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContratarModalPage } from './contratar-modal.page';

describe('ContratarModalPage', () => {
  let component: ContratarModalPage;
  let fixture: ComponentFixture<ContratarModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratarModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
