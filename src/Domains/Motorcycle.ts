import IMotorcycle from '../Interfaces/IMotorcycle';
import Vehicle from './Vehicle';

export default class Motorcycle extends Vehicle {
  private category: string;
  private engineCapacity: number;

  constructor(vehicle: IMotorcycle) {
    super(vehicle);

    this.category = vehicle.category;
    this.engineCapacity = vehicle.engineCapacity;
  }
}
