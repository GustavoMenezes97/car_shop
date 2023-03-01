import { Schema, isValidObjectId } from 'mongoose';
import IMotorcycle from '../Interfaces/IMotorcycle';
import AbstractODM from './AbstractODM';

export default class MotorcycleODM extends AbstractODM<IMotorcycle> {
  constructor() {
    const schema = new Schema<IMotorcycle>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: false },
      buyValue: { type: Number, required: true },
      category: { type: String, required: true },
      engineCapacity: { type: Number, required: true },
    });
    super('Motorcycle', schema);
  }

  public async getById(id: string): Promise<IMotorcycle | null | undefined> {
    if (!isValidObjectId(id)) {
      return undefined;
    }
    
    return this.model.findById(id);
  }

  public async updateById(id: string, motorcycle: IMotorcycle)
    : Promise<IMotorcycle | null | undefined> {
    if (!isValidObjectId(id)) {
      return undefined;
    }

    return this.model.findOneAndUpdate(
      { _id: id },
      { ...motorcycle },
      { new: true },
    );
  }
}
