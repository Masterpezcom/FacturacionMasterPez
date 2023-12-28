import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetFacturaComponent } from './det-factura.component';

describe('DetFacturaComponent', () => {
  let component: DetFacturaComponent;
  let fixture: ComponentFixture<DetFacturaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetFacturaComponent]
    });
    fixture = TestBed.createComponent(DetFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
