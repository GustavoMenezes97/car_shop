import { expect } from 'chai';
import Sinon from 'sinon';
import { Model } from 'mongoose';
import ICar from '../../../src/Interfaces/ICar';
import Car from '../../../src/Domains/Car';
import CarService from '../../../src/Services/CarService';

const carIm: ICar = {
  model: 'Celta',
  year: 2005,
  color: 'Preto',
  buyValue: 1500,
  doorsQty: 2,
  seatsQty: 2,
};

const carOut: Car = new Car({
  id: '63ff5ebb9e4832c84dc01a93',
  model: 'Celta',
  year: 2005,
  color: 'Preto',
  status: false,
  buyValue: 1500,
  doorsQty: 2,
  seatsQty: 2,
}); 

describe('Testando camada service da rota cars', function () {
  it('Testa se consegue criar um carro', async function () {
    Sinon.stub(Model, 'create').resolves(carOut);

    const carService = new CarService();

    const result = await carService.create(carIm);

    expect(result).to.be.deep.equal(carOut);
  });

  it('Testa se consegue listar todos os carros', async function () {
    Sinon.stub(Model, 'find').resolves([carOut]);

    const carService = new CarService();

    const result = await carService.getAll();

    expect(result).to.be.deep.equal([carOut]);
  });

  it('Testa se consegue encontrar um carro pelo ID', async function () {
    Sinon.stub(Model, 'findById').resolves(carOut);

    const carService = new CarService();

    const result = await carService.getById('63ff5ebb9e4832c84dc01a93');

    expect(result).to.be.deep.equal(carOut);
  });

  it('Testa se consegue editar algum dado do carro pelo Id', async function () {
    Sinon.stub(Model, 'findOneAndUpdate').resolves(carOut);

    const carService = new CarService();

    const result = await carService.updateById('63ff5ebb9e4832c84dc01a93', carIm);

    expect(result).to.be.deep.equal(carOut);
  });
  
  afterEach(function () {
    Sinon.restore();
  });
});
