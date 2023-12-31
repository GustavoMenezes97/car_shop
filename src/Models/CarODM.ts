import { Schema, isValidObjectId } from 'mongoose';
import ICar from '../Interfaces/ICar';
import AbstractODM from './AbstractODM';

export default class CarODM extends AbstractODM<ICar> {
  constructor() {
    const schema = new Schema<ICar>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: false },
      buyValue: { type: Number, required: true },
      doorsQty: { type: Number, required: true },
      seatsQty: { type: Number, required: true },
    });
    super('Car', schema);
  }

  public async getById(id: string): Promise<ICar | null | undefined> {
    if (!isValidObjectId(id)) {
      return undefined;
    }
    
    return this.model.findById(id);
  }

  public async updateById(id: string, car: ICar): Promise<ICar | null | undefined> {
    if (!isValidObjectId(id)) {
      return undefined;
    }

    return this.model.findOneAndUpdate(
      { _id: id },
      { ...car },
      { new: true },
    );
  }
}
