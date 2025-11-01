import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleresultComponent } from './vehicleresult.component';

describe('VehicleresultComponent', () => {
  let component: VehicleresultComponent;
  let fixture: ComponentFixture<VehicleresultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleresultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
