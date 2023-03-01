import Motorcycle from '../Domains/Motorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';
import IMotorcycle from '../Interfaces/IMotorcycle';

export default class MotorcycleService {
  private createMotorcycleDomain(motorcycle: IMotorcycle | null): Motorcycle | null {
    if (motorcycle) {
      return new Motorcycle(motorcycle);
    }

    return null;
  }
  
  public async create(motorcycle: IMotorcycle) {
    const motorcycleODM = new MotorcycleODM();
    const newMotorcycle = await motorcycleODM.create(motorcycle);

    return this.createMotorcycleDomain(newMotorcycle);
  }

  public async getAll() {
    const motorcycleODM = new MotorcycleODM();
    const motorcycles = await motorcycleODM.getAll();

    return motorcycles.map((motorcycle) => this.createMotorcycleDomain(motorcycle));
  }

  public async getById(id: string) {
    const motorcycleODM = new MotorcycleODM();
    const motorcycle = await motorcycleODM.getById(id);
    
    if (motorcycle === undefined) {
      return undefined;
    }
    
    return this.createMotorcycleDomain(motorcycle);
  }

  public async updateById(id: string, motorcycle: IMotorcycle) {
    const motorcycleODM = new MotorcycleODM();
    const updatedMotorcycle = await motorcycleODM.updateById(id, motorcycle);

    if (updatedMotorcycle === undefined) {
      return undefined;
    }
    
    return this.createMotorcycleDomain(updatedMotorcycle);
  }
}
