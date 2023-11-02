import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CierreComponent } from './cierre.component';

describe('CierreComponent', () => {
  let component: CierreComponent;
  let fixture: ComponentFixture<CierreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CierreComponent]
    });
    fixture = TestBed.createComponent(CierreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
