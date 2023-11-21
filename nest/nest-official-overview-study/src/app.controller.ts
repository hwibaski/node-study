import {
  Controller,
  Get,
  HostParam,
  Query,
  Redirect,
  Req,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller({ host: 'localhost111' })
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@HostParam() host, @Req() req): string {
    console.log(req.hostname);
    console.log(host);
    return this.appService.getHello();
  }

  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }
}
