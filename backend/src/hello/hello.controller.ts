import { Controller, Get } from '@nestjs/common';
import { HelloService } from './hello.service';

@Controller('hello') // Base de l’URL : /hello
export class HelloController {
  constructor(private readonly helloService: HelloService) {}

  @Get() // GET /hello
  getHello(): string {
    return this.helloService.getHello();
  }
}
