export class Vehicle {
     imageFile: File | null | undefined;
  permitLevel: string | undefined;
  vehicleType: string | undefined;
  vehicleRegNo: string | undefined;
  driverMob: string | undefined;
  capacity: string | undefined;
  price: string | undefined;
  originCity: string | undefined;
  destinationCity: string | undefined;
  description: string | undefined;

  constructor(init?: Partial<Vehicle>) {
     Object.assign(this, init);
    }

}
