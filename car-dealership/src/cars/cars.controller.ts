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
import { CreateCarDto, UpdateCarDto } from './dto';

@Controller('cars')
// @UsePipes(ValidationPipe)
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
  createACar(@Body() createCarDto: CreateCarDto) {
    return this.carsService.createACar(createCarDto);
  }

  @Patch(':id')
  updateACar(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCarDto: UpdateCarDto,
  ) {
    return this.carsService.updateACar(id, updateCarDto);
  }

  @Delete(':id')
  deleteACar(@Param('id', ParseUUIDPipe) id: string) {
    return this.carsService.deleteACar(id);
  }
}
