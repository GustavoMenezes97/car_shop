import { expect } from 'chai';
import Sinon from 'sinon';
import { Model } from 'mongoose';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import Motorcycle from '../../../src/Domains/Motorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';

const motorcycleIm: IMotorcycle = {
  model: 'Honda Cb 600f Hornet',
  year: 2005,
  color: 'Yellow',
  status: true,
  buyValue: 30.000,
  category: 'Street',
  engineCapacity: 600,
};

const motorcycleOut: Motorcycle = new Motorcycle({
  id: '63ff71609e4832c84dc01a95',
  model: 'Honda Cb 600f Hornet',
  year: 2005,
  color: 'Yellow',
  status: true,
  buyValue: 30.000,
  category: 'Street',
  engineCapacity: 600,
}); 

describe('Testando camada service da rota motorcycles', function () {
  it('Testa se consegue criar uma moto', async function () {
    Sinon.stub(Model, 'create').resolves(motorcycleOut);

    const motorcycleService = new MotorcycleService();

    const result = await motorcycleService.create(motorcycleIm);

    expect(result).to.be.deep.equal(motorcycleOut);
  });

  it('Testa se consegue listar todas as motos', async function () {
    Sinon.stub(Model, 'find').resolves([motorcycleOut]);

    const motorcycleService = new MotorcycleService();

    const result = await motorcycleService.getAll();

    expect(result).to.be.deep.equal([motorcycleOut]);
  });

  it('Testa se consegue encontrar uma moto pelo ID', async function () {
    Sinon.stub(Model, 'findById').resolves(motorcycleOut);

    const motorcycleService = new MotorcycleService();

    const result = await motorcycleService.getById('63ff71609e4832c84dc01a95');

    expect(result).to.be.deep.equal(motorcycleOut);
  });

  it('Testa se consegue editar algum dado da moto pelo Id', async function () {
    Sinon.stub(Model, 'findOneAndUpdate').resolves(motorcycleOut);

    const motorcycleService = new MotorcycleService();

    const result = await motorcycleService.updateById('63ff71609e4832c84dc01a95', motorcycleIm);

    expect(result).to.be.deep.equal(motorcycleOut);
  });
  
  afterEach(function () {
    Sinon.restore();
  });
});
