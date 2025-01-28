import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Name } from './name.entity';
import { Repository } from 'typeorm';
import { first } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Name)
    private namesRepository: Repository<Name>,
  ) {}

  async addName(firstName: string, lastName: string) {
    console.log('Name:', firstName, lastName)
    // take the name and save it into the name table of hte database
    await this.namesRepository.save({
      first_name: firstName, 
      last_name: lastName
    });
    return await this.getNames(); //to return all names after every new name is added
  }

  async getNames() {
    //get all names from database
    const names = await this.namesRepository.find();
    console.log('Names:', names)
    return names;
  }
}
