import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto, UpdateCarDto } from './dto';

@Injectable()
export class CarsService {
  // private cars: Car[] = [
  //   {
  //     id: uuid(),
  //     brand: 'Toyota',
  //     model: 'Corolla',
  //   },
  //   {
  //     id: uuid(),
  //     brand: 'Honda',
  //     model: 'Civic',
  //   },
  //   {
  //     id: uuid(),
  //     brand: 'Jeep',
  //     model: 'Cherokee',
  //   },
  // ];

  private cars: Car[] = [];

  findAllCars(): Car[] {
    return this.cars;
  }

  findCarById(id: string): Car {
    const car = this.cars.find((car) => car.id === id);
    if (!car) throw new NotFoundException(`Car with id: '${id}' not found`);
    return car;
  }

  createACar(createCarDto: CreateCarDto): Car {
    const newCar = {
      id: uuid(),
      ...createCarDto,
    };
    this.cars.push(newCar);
    return newCar;
  }

  updateACar(id: string, updateCarDto: UpdateCarDto) {
    let carDB = this.findCarById(id);

    if (updateCarDto.id && updateCarDto.id !== id)
      throw new NotFoundException(`car id is not valid inside body`);
    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        carDB = { ...carDB, ...updateCarDto, id };
        return carDB;
      }
      return car;
    });

    return carDB;
  }

  deleteACar(id: string) {
    const car = this.findCarById(id);
    this.cars = this.cars.filter((car) => car.id !== id);
    return car;
  }

  fillCarsWithSeedData(cars: Car[]) {
    this.cars = cars;
  }
}
