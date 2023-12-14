import { Injectable, NotFoundException } from '@nestjs/common';
import { car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto } from './dto/create-car.dto';

@Injectable()
export class CarsService {
  private cars: car[] = [
    {
      id: uuid(),
      brand: 'Toyota',
      model: 'Corolla',
    },
    {
      id: uuid(),
      brand: 'Honda',
      model: 'Civic',
    },
    {
      id: uuid(),
      brand: 'Jeep',
      model: 'Cherokee',
    },
  ];

  findAllCars(): car[] {
    return this.cars;
  }

  findCarById(id: string): car {
    const car = this.cars.find((car) => car.id === id);
    if (!car) throw new NotFoundException(`Car with id: '${id}' not found`);
    return car;
  }

  createACar(createCarDto: CreateCarDto): car {
    const newCar = {
      id: uuid(),
      ...createCarDto,
    };
    this.cars.push(newCar);
    return newCar;
  }

  deleteACar(id: string) {
    const car = this.findCarById(id);
    this.cars = this.cars.filter((car) => car.id !== id);
    return car;
  }
}
