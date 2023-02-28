import { NextFunction, Request, Response } from 'express';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/CarService';

export default class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CarService();
  }

  public async create() {
    const car: ICar = this.req.body;

    try {
      const newCar = await this.service.create(car);
      
      return this.res.status(201).json(newCar);
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
        return this.res.status(404).json({ message: 'Car not found' });
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
    const car = this.req.body;

    try {
      const updateById = await this.service.updateById(id, car);

      if (updateById === null) {
        return this.res.status(404).json({ message: 'Car not found' });
      } if (updateById === undefined) {
        return this.res.status(422).json({ message: 'Invalid mongo id' });
      }
      
      return this.res.status(200).json(updateById);
    } catch (error) {
      this.next(error);
    }
  }
}
