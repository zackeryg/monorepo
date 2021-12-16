import { Controller, Get, Post, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { Prose } from './prose.model';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/create')
  async createProse(): Promise<string> {
    return this.appService.create('content');
  }

  @Get('/get/:id')
  async getProse(@Param('id') id: string): Promise<any> {
    return this.appService.get(id);
  }
}
