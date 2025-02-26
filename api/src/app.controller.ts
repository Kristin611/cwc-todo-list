import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/name')
  async addName(
    @Body('firstName') firstName: string, 
    @Body('lastName') lastName: string
    ) {
    console.log('BODY:', firstName, lastName)
    return await this.appService.addName(firstName, lastName)
    
  }

  @Get()
  getNames() {
    return this.appService.getNames();
  }
}
