import { NextFunction, Request, Response } from 'express';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleService from '../Services/MotorcycleService';

export default class MotorcycleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotorcycleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotorcycleService();
  }

  public async create() {
    const motorcycle: IMotorcycle = this.req.body;

    try {
      const newMotorcycle = await this.service.create(motorcycle);
      
      return this.res.status(201).json(newMotorcycle);
    } catch (error) {
      this.next(error);
    }
  }

  public async getAll() {
    try {
      const getAll = await this.service.getAll();

      return this.res.status(200).json(getAll);
    } catch (error) {
      this.next(error);
    }
  }

  public async getById() {
    const { id } = this.req.params;

    try {
      const getById = await this.service.getById(id);

      if (getById === null) {
        return this.res.status(404).json({ message: 'Motorcycle not found' });
      } if (getById === undefined) {
        return this.res.status(422).json({ message: 'Invalid mongo id' });
      }
      
      return this.res.status(200).json(getById);
    } catch (error) {
      this.next(error);
    }
  }

  public async updateById() {
    const { id } = this.req.params;
    const motorcycle = this.req.body;

    try {
      const updateById = await this.service.updateById(id, motorcycle);

      if (updateById === null) {
        return this.res.status(404).json({ message: 'Motorcycle not found' });
      } if (updateById === undefined) {
        return this.res.status(422).json({ message: 'Invalid mongo id' });
      }
      
      return this.res.status(200).json(updateById);
    } catch (error) {
      this.next(error);
    }
  }
}
