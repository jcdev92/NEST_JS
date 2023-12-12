import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}
  @Get()
  getAllCars() {
    return this.carsService.findAllCars();
  }

  @Get(':id')
  getCarById(@Param('id', ParseUUIDPipe) id: string) {
    return this.carsService.findCarById(id);
  }

  @Post()
  createACar(@Body() body: any) {
    return body;
  }

  @Patch(':id')
  updateACar(@Body() body: any) {
    return body;
  }

  @Delete(':id')
  deleteACar(@Param('id') id: string) {
    return `car id: '${id}' deleted`;
  }
}
