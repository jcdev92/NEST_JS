import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto, UpdateBrandDto } from './dto';
import { v4 as uuid } from 'uuid';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandsService {
  // private brands = [
  //   { id: uuid(), name: 'Toyota', createdAt: new Date().getTime() },
  //   { id: uuid(), name: 'Honda', createdAt: new Date().getTime() },
  //   { id: uuid(), name: 'Jeep', createdAt: new Date().getTime() },
  //   { id: uuid(), name: 'Tesla', createdAt: new Date().getTime() },
  //   { id: uuid(), name: 'BMW', createdAt: new Date().getTime() },
  //   { id: uuid(), name: 'Volvo', createdAt: new Date().getTime() },
  // ];

  private brands: Brand[] = [];

  create(createBrandDto: CreateBrandDto) {
    const { name } = createBrandDto;
    const brand: Brand = {
      id: uuid(),
      name: name.toLowerCase(),
      createdAt: new Date().getTime(),
    };
    this.brands.push(brand);
    return brand;
  }

  findAll() {
    return this.brands;
  }

  findOne(id: string) {
    const brand = this.brands.find((brand) => brand.id === id);
    if (!brand)
      throw new NotFoundException('Brand with id: ' + id + ' was not found');
    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    let brandDB: Brand = this.findOne(id);
    this.brands = this.brands.map((brand) => {
      if (brand.id === id) {
        brandDB.updatedAt = new Date().getTime();
        brandDB = { ...brandDB, ...updateBrandDto };
        return brandDB;
      }
      return brand;
    });
    return brandDB;
  }

  remove(id: string) {
    this.brands = this.brands.filter((brand) => brand.id !== id);
    return this.brands;
  }

  fillBrandsWithSeedData(brands: Brand[]) {
    this.brands = brands;
  }
}
