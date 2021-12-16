import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { Prose } from './prose.model';
class CreateBody {
  content: string;
}
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/create')
  async createProse(@Body() createBody: CreateBody): Promise<string> {
    console.log('saving content', createBody.content)
    return this.appService.create(createBody.content);
  }

  @Get('/get/:id')
  async getProse(@Param('id') id: string): Promise<any> {
    return this.appService.get(id);
  }
}
