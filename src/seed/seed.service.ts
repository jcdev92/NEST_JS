import { Injectable } from '@nestjs/common';
import { Pokemon as pokeInterface } from './poke-interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { AxiosAdapter } from 'src/common/adapter/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ) {}

  async execute() {
    await this.pokemonModel.deleteMany({}); // delete all pokemons in the db

    //? opcion 1. Manejar promesas simultaneas con promise all

    // const data = await this.http.get<pokeInterface>(
    //   'https://pokeapi.co/api/v2/pokemon?limit=650',
    // );
    // const { results } = data;
    // const insertPromisesArray = [];

    // results.map(({ name, url }) => {
    //   const parts = url.split('/');
    //   const no = parts[parts.length - 2];
    //   insertPromisesArray.push(this.pokemonModel.create({ name, no }));
    // });

    // await Promise.all(insertPromisesArray);

    //? Opcion 2. Usar insertMany de mongo para inyectar multiples datos en la base de datos.

    const data = await this.http.get<pokeInterface>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );
    const { results } = data;
    const pokemonToInsert: { name: string; no: number }[] = [];

    results.map(({ name, url }) => {
      const segments = url.split('/');
      const no = +segments[segments.length - 2];
      pokemonToInsert.push({ name, no });
    });

    await this.pokemonModel.insertMany(pokemonToInsert);

    return `seed executed`;
  }
}
