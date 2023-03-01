import ICar from '../Interfaces/ICar';
import Vehicle from './Vehicle';

export default class Car extends Vehicle {
  private doorsQty: number;
  private seatsQty: number;

  constructor(vehicle: ICar) {
    super(vehicle);
    
    this.doorsQty = vehicle.doorsQty;
    this.seatsQty = vehicle.seatsQty;
  }
}
