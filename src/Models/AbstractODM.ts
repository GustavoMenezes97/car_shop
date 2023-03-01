import { Model, Schema, model, models } from 'mongoose';

export default abstract class AbstractODM<T> {
  protected schema: Schema;
  protected model: Model<T>;
  protected name: string;

  constructor(name: string, schema: Schema) {
    this.schema = schema;
    this.name = name;
    
    this.model = models[this.name] || model(this.name, this.schema);
  }

  public async create(vehicle: T): Promise<T> {
    return this.model.create({ ...vehicle });
  }

  public async getAll(): Promise<T[]> {
    return this.model.find();
  }
}
