import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclesearchComponent } from './vehiclesearch.component';

describe('VehiclesearchComponent', () => {
  let component: VehiclesearchComponent;
  let fixture: ComponentFixture<VehiclesearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehiclesearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiclesearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
