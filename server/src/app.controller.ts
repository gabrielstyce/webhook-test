import { Controller, Get, All, Req, Param, Logger } from '@nestjs/common';
import { Request } from 'express';
import { EventsService } from './events/events.service';
import { GLOBAL_PREFIX, getUrlApi } from './main';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly eventService: EventsService) { }

  @Get()
  getHello() {
    return 'Hello, world!';
  }

  @All(":id")
  getRequet(@Req() request: Request, @Param('id') id: string) {
    this.logger.log(`Request no ID ${id} recebido!`);

    const data = {
      body: request.body,
      method: request.method,
      hostname: request.hostname,
      headers: request.headers,
      cookies: request.cookies,
      ip: request.ip,
      ips: request.ips,
      secure: request.secure,
      protocol: request.protocol,
      params: request.params,
      queryParams: request.query,
      url: request.originalUrl
    };

    this.eventService.emitEvent({ id, data });

    return `OK - View the requests messagens in ${getUrlApi().replace(GLOBAL_PREFIX, id)}`;
  }
}
